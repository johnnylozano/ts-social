import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateForm = () => {
   const schema = yup.object().shape({
      title: yup.string().required("You must add a title."),
      description: yup.string().required("You must add a description"),
   });

   const {} = useForm({
      resolver: yupResolver(schema),
   });
   return (
      <form action="">
         <input type="text" placeholder="Title..." />
         <textarea placeholder="Description..." />
         <input type="submit" />
      </form>
   );
};
