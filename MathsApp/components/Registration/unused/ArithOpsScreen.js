import React, { useState, useEffect } from "react";
import { MySurface } from "./MySurface";
import { View } from "react-native";
export const ArithOpsScreen = () => {
  const arithops = [
    { name: "Addition", operator: "+" },
    { name: "Subtraction", operator: "−" },
    { name: "Multiply", operator: "×" },
    { name: "Division", operator: "÷" },
    { name: "Comparisons", operator: "=" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      {arithops.map((k) => (
        <MySurface key={k.operator} name={k.name} symbol={k.operator} />
      ))}
    </View>
  );
};
