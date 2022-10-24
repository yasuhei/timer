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
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

type InputPropsSubmit = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod.number().min(5).max(60, "O número máximo é de 60 min"),
});
interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountMinutesPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setAmountMinutesPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        );
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  const { register, handleSubmit, watch, reset } = useForm<InputPropsSubmit>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const id = String(new Date().getTime());
  function handleSubmitForm(data: InputPropsSubmit) {
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((states) => [...states, newCycle]);

    setActiveCycleId(id);
    setAmountMinutesPassed(0);
    reset();
  }

  const totalSecond = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSecond - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  console.log(activeCycle);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
