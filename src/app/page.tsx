"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BMI } from "@/lib/constants";
import { useState } from "react";

import GaugeChart from "react-gauge-chart";

export default function Home() {
  const [height, setHeight] = useState<number>(170);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(80);

  const bmi = Math.floor(BMI(height, weight));

  const handleHeightChange = (value: number[]) => {
    setHeight(value[0]);
  };

  const handleWeightChange = (value: number[]) => {
    setWeight(value[0]);
  };

  const bmiLabel = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const getColor = (bmi: number) => {
    if (bmi < 18.5) return "#006400"; // Dark Green
    if (bmi < 24.9) return "#228B22"; // Forest Green
    if (bmi < 29.9) return "#FFD700"; // Gold
    return "#8B0000"; // Dark Red
  };

  const getAdvice = (bmi: number) => {
    if (bmi < 18.5)
      return "You are underweight. It's important to eat a balanced diet and consult with a healthcare provider to ensure you're getting the right nutrients.";
    if (bmi < 24.9)
      return "You have a normal weight. Keep up with your healthy eating habits and regular physical activity.";
    if (bmi < 29.9)
      return "You are overweight. Consider adopting healthier eating habits and increasing your physical activity. Consulting a healthcare provider can also be beneficial.";
    return "You are obese. It's important to seek advice from a healthcare provider to develop a plan that includes healthy eating and physical activity.";
  };

  return (
    <main className="flex flex-col flex-1 items-center 2xl:mt-10 w-full h-full">
      <div className="w-full flex flex-col items-center justify-center h-full my-auto -mt-1">
        <div className="flex flex-col items-center my-10 text-teal-50 w-full md:w-[80%] lg:w-[65%] lg:text-3xl">
          <Label htmlFor="height" className="mb-2 text-xl 2xl:text-3xl">
            Height: {height} cm
          </Label>
          <Slider
            id="height"
            value={[height]}
            max={300}
            step={1}
            disabled={isLoading}
            onValueChange={handleHeightChange}
          />
        </div>
        <div className="flex flex-col items-center my-10 text-teal-50 w-full md:w-[80%] lg:w-[65%] lg:text-3xl">
          <Label htmlFor="weight" className="mb-2 text-xl 2xl:text-3xl">
            Weight: {weight} kg
          </Label>
          <Slider
            id="weight"
            value={[weight]}
            max={300}
            disabled={isLoading}
            step={1}
            onValueChange={handleWeightChange}
          />
        </div>

        {!isLoading && (
          <Button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
            }}
          >
            Calculate your BMI
          </Button>
        )}
        {isLoading && (
          <Button
            disabled={!isLoading}
            onClick={() => {
              setWeight(80);
              setHeight(170);
              setIsLoading(false);
            }}
          >
            Reset
          </Button>
        )}

        {isLoading && (
          <>
            <h2
              className="mt-10 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl "
              style={{ color: getColor(bmi) }}
            >{`BMI: ${bmi} (${bmiLabel(bmi)})`}</h2>
            <div className="w-[200px] md:w-[250px] lg:w-[300px]  xl:w-[350px] 2xl:w-[500px]">
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={4}
                colors={["#006400", "#228B22", "#FFD700", "#8B0000"]}
                arcWidth={0.1}
                percent={(bmi - 10) / 30}
                textColor="transparent" // Hide the text inside the gauge
                needleColor="#222"
              />
            </div>
            <div className="flex flex-col justify-start items-start w-[70%] mt-5 2xl:ml-[200px]">
              <Label
                htmlFor="advices"
                className="mt-2  text-[15px] md:text-[17px] lg:text-[18px] xl:text-[19px]  text-slate-50 2xl:text-3xl"
              >
                Comments:
              </Label>
              <p className="mt-4 text-[11px] text-slate-50 md:text-[12px] lg:text-[13px] xl:text-[17px] 2xl:text-[19px] ">
                {getAdvice(bmi)}
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
