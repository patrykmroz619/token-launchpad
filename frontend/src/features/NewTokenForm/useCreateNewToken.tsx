import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useWeb3Wallet } from "@/contexts";
import { ethers } from "ethers";
import { tokenContractAbi, tokenContractBytecode } from "@/constants";
import { getBlockchainErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { Link, Typography } from "@mui/material";

type FormDataType = {
  name: string;
  symbol: string;
  amount: number | string;
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
  const { control, handleSubmit, reset } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      symbol: "",
      amount: "",
    },
  });

  const { provider, chainData } = useWeb3Wallet();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: FormDataType) => {
    setIsLoading(true);
    let currentToastId;
    try {
      if (!provider) {
        throw new Error("Wallet is not connected");
      }
      const signer = provider.getSigner();

      const TokenContractFactory = new ethers.ContractFactory(
        tokenContractAbi,
        tokenContractBytecode,
        signer
      );

      currentToastId = toast.loading(
        `Please confirm deploy transaction in your wallet app.`,
        {
          delay: Infinity,
        }
      );

      const NewToken = await TokenContractFactory.deploy(
        formData.name,
        formData.symbol,
        ethers.utils.parseEther(String(formData.amount))
      );

      toast.dismiss(currentToastId);

      currentToastId = toast.loading(
        <>
          <Typography>Deploying new token contract...</Typography>
          <Link
            target="_blank"
            href={`${chainData.explorer}tx/${NewToken.deployTransaction.hash}`}
          >
            View on block explorer
          </Link>
        </>,
        {
          delay: Infinity,
        }
      );

      await NewToken.deployed();

      toast.dismiss(currentToastId);

      toast.success(
        <>
          <Typography>
            New token created address: {NewToken.address.slice(0, 8)}...
          </Typography>
          <Link
            target="_blank"
            href={`${chainData.explorer}token/${NewToken.address}`}
          >
            View on block explorer
          </Link>
        </>
      );

      reset();
    } catch (e: unknown) {
      console.error(e);
      const errorMessage = getBlockchainErrorMessage(
        e,
        "Something went wrong, please try again later!"
      );

      toast.dismiss(currentToastId);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { control, isLoading, handleSubmit: handleSubmit(onSubmit) };
};
