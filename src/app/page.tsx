"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BMI } from "@/lib/constants";
import { useState } from "react";

export default function Home() {
  const [height, setHeight] = useState(170);
  const [isLoading, setIsLoading] = useState(false);

  const [weight, setWeight] = useState(80);
  const bmi = Math.floor(BMI(height, weight));
  const handleHeightChange = (value: number[]) => {
    setHeight(value[0]);
  };
  const handleWeightChange = (value: number[]) => {
    setWeight(value[0]);
  };

  return (
    <main className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-center my-10 text-teal-50 w-full">
        <Label htmlFor="height" className="mb-2 text-xl">
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
      <div className="flex flex-col items-center my-5 text-teal-50 w-full mb-10">
        <Label htmlFor="weight" className="mb-2 text-xl">
          Weight: {weight} kg
        </Label>
        <Slider
          id="weight"
          value={[weight]}
          max={300}
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
          Calculate your bmi
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

      {isLoading && <h2 className="text-teal-50 mt-10 text-2xl">{bmi}</h2>}
    </main>
  );
}
