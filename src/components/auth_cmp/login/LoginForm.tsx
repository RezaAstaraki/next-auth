"use cilen";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schemas/authSchemas";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

type Props = {};

export default function LoginForm({}: Props) {
  const {
    register,
    formState: { errors },
    reset,
    resetField,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit = (data: LoginSchemaType) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col space-y-2">
      <div>
        <Input
          type="text"
          {...register("email")}
          errorMessage={errors.email && errors.email.message}
          isInvalid={!!errors.email}
        />
      </div>
      <div>
        <Input
          type="password"
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
      </div>
      <Button type="submit">log in</Button>
    </form>
  );
}
