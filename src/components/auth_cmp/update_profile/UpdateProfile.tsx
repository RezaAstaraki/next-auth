import { profileUpdate } from "@/actions/user/user-actions";
import {
  updateProfileSchema,
  UpdateProfileSchemaType,
} from "@/schemas/third-party-api-schemas";
import { useFormMutation } from "@/src/hooks/useFormMutation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {};

export default function UpdateProfile({}: Props) {
  const updateProfileForm = useForm<UpdateProfileSchemaType>({
    // resolver: zodResolver(updateProfileSchema),
  });

  const updateProfileMutate = useFormMutation({
    mutationFn: profileUpdate,
    mutationKey: ["updateProfile"],
  },{toastContent:'all',hookForm:updateProfileForm});

  const submitProfileUpdate = async (data: UpdateProfileSchemaType) => {
    console.log('data in handle submit update prfole',data)
    updateProfileMutate.mutate(data);
  };
  // useEffect(()=>{
  //   console.error(updateProfileForm.formState.errors)
  // },[updateProfileForm.formState.errors])
  return (
    <form
      className="gap-4 border flex flex-col p-4"
      onSubmit={updateProfileForm.handleSubmit(submitProfileUpdate)}
    >
      <Input
        placeholder="first name"
        errorMessage={updateProfileForm.formState.errors?.first_name?.message}
        isInvalid={!!updateProfileForm.formState.errors.first_name}
        {...updateProfileForm.register("first_name")}
      />
      <Input
        placeholder="last name"
        errorMessage={updateProfileForm.formState.errors?.last_name?.message}
        isInvalid={!!updateProfileForm.formState.errors.last_name}
        {...updateProfileForm.register("last_name")}
      />
      <Input
        placeholder="email"
        errorMessage={updateProfileForm.formState.errors?.email?.message}
        isInvalid={!!updateProfileForm.formState.errors.email}
        {...updateProfileForm.register("email")}
      />
      <Input
        placeholder="national_code"
        errorMessage={updateProfileForm.formState.errors?.national_code?.message}
        isInvalid={!!updateProfileForm.formState.errors.national_code}
        {...updateProfileForm.register("national_code")}
      />
      <Input
        placeholder="postal_code"
        errorMessage={updateProfileForm.formState.errors?.postal_code?.message}
        isInvalid={!!updateProfileForm.formState.errors.postal_code}
        {...updateProfileForm.register("postal_code")}
      />
      <Button type="submit">submit</Button>
    </form>
  );
}
