import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

type InputPropsSubmit = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60, "O número máximo é de 60 min"),
});

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<InputPropsSubmit>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleSubmitForm(data: InputPropsSubmit) {
    console.log(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  watch;
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleSubmitForm)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            id="task"
            list="task-info"
            {...register("task")}
          />

          <datalist id="task-info">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            max={60}
            step={5}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
