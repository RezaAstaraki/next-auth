import { profileShow, profileUpdate } from "@/actions/user/user-actions";
// import {
//   updateProfileSchema,
//   UpdateProfileSchemaType,
// } from "@/schemas/third-party-api-schemas";
import { useFormMutation } from "@/src/hooks/useFormMutation";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Clo from "../../general components/client logger/Clo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@heroui/react";
import { userAuthChecker } from "@/src/hooks/useAuthChecker";
import {
  updateProfileSchema,
  UpdateProfileSchemaType,
} from "@/schemas/authSchemas";
import { useAppDispatch } from "@/src/redux/store";
import { setUserDetail } from "@/src/redux/features/customer/userSlice";

type Props = {};

export default function UpdateProfile({}: Props) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const updateProfileForm = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { executeAction: ProfileUpdateA } = userAuthChecker(profileUpdate);
  const { executeAction: profileShowA } = userAuthChecker(profileShow);

  const updateProfileMutate = useFormMutation(
    {
      mutationFn: ProfileUpdateA,
      mutationKey: ["updateProfile"],
      onSettled: (data) => {
        if (data?.ok) {
          queryClient.invalidateQueries({ queryKey: ["profileShow"] });       
          dispatch(setUserDetail({...data.body}));
        }
      },
    },
    {
      toastContent: "all",
      hookForm: updateProfileForm,
      onSuccessToastMessage: "done SuccessFully",
    }
  );

  const submitProfileUpdate = async (data: UpdateProfileSchemaType) => {
    if (getProfileQuery.data?.ok && getProfileQuery.data.body.verified_at) {
      delete data["national_code"];
    }
    updateProfileMutate.mutate(data);
  };

  const getProfileQuery = useQuery({
    queryKey: ["profileShow"],
    queryFn: profileShowA,
  });

  useEffect(() => {
    if (getProfileQuery.data?.ok) {
      const body = getProfileQuery.data.body;
      updateProfileForm.reset({
        first_name: body.first_name ?? "",
        last_name: body.last_name ?? "",
        national_code: body.national_code ?? "",
        postal_code: body.postal_code ?? "",
        email: body.email ?? "",
      });
    }
  }, [getProfileQuery.isFetching]);

  return (
    <>
      <Button onPress={() => getProfileQuery.refetch()} type="button">
        revalidate refetch
      </Button>
      <Button onPress={() => {}} type="button">
        revalidate method two
      </Button>

      {!getProfileQuery.isPending ? (
        <form
          className="gap-4 border flex flex-col p-4"
          onSubmit={updateProfileForm.handleSubmit(submitProfileUpdate)}
        >
          <Input
            placeholder="first name"
            errorMessage={
              updateProfileForm.formState.errors?.first_name?.message
            }
            isInvalid={!!updateProfileForm.formState.errors.first_name}
            {...updateProfileForm.register("first_name")}
          />
          <Input
            placeholder="last name"
            errorMessage={
              updateProfileForm.formState.errors?.last_name?.message
            }
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
            errorMessage={
              updateProfileForm.formState.errors?.national_code?.message
            }
            isInvalid={!!updateProfileForm.formState.errors.national_code}
            {...updateProfileForm.register("national_code")}
          />
          <Input
            placeholder="postal_code"
            errorMessage={
              updateProfileForm.formState.errors?.postal_code?.message
            }
            isInvalid={!!updateProfileForm.formState.errors.postal_code}
            {...updateProfileForm.register("postal_code")}
          />
          <Button type="submit">submit</Button>
        </form>
      ) : (
        <Skeleton className="w-[250px] h-[360px] rounded" />
      )}
    </>
  );
}
