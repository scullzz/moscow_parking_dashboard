import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      const response = await fetch(
        'https://api.projectdevdnkchain.ru/test-admin-auth',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            auth: data.password,
            login: data.email
          }
        }
      );
      if (response.status === 200) {
        router.push('/users');
      } else {
        alert('Invalid email or password');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Log In
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </>
  );
}
