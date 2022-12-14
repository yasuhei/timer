import { CountdownContainer, Separator } from "./styles";
import { useContext, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../context/CyclesConctext";

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSecond = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        );

        if (secondDifference >= totalSecond) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSecond);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSecond,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  const currentSeconds = activeCycle ? totalSecond - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
