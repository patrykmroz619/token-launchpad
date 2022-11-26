import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

type FormDataType = {
  name: string;
  symbol: string;
  amount: string;
};

const schema = yup.object().shape({
  name: yup.string().required("This field is required"),
  symbol: yup.string().required("This field is required"),
  amount: yup
    .number()
    .typeError("The provided value is not correct number value")
    .required("This field is required"),
});

export const useCreateNewToken = () => {
  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      symbol: "",
      amount: "",
    },
  });

  const onSubmit = (formData: FormDataType) => {
    console.log(formData);
  };

  return { control, handleSubmit: handleSubmit(onSubmit) };
};
