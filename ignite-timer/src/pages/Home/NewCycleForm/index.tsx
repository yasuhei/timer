import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../context/CyclesConctext";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em</label>
      <TaskInput
        placeholder="Dê um nome para o seu projeto"
        id="task"
        list="task-info"
        disabled={!!activeCycle}
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
        step={1}
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
