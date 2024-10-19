import Chicken from "../models/Chicken"
import Cow from "../models/Cow"

export const words = [
  {
    indonesian: "sapi",
    english: "cow",
    ngoko: "sapi",
    madya: "lembu",
    alus: "lembu",
    model: <Cow scale={5} />,
    colliderSize: [0.7, 1.2, 2],
    colliderPosition: [0, 1.2, 0.8],
  },
  {
    indonesian: "ayam",
    english: "chicken",
    ngoko: "pitik",
    madya: "pitik",
    alus: "kukus",
    model: <Chicken scale={0.003} />,
    colliderSize: [0.35, 0.5, 0.35],
    colliderPosition: [0, 0.5, 0],
  },
]

export const positions = [
  {
    position: [0, 0, -15],
  },
  {
    position: [3, 0, -15],
  },
  {
    position: [6, 0, -15],
  },
  {
    position: [-3, 0, -15],
  },
  {
    position: [-6, 0, -15],
  },
  {
    position: [0, 0, -10],
  },
  {
    position: [3, 0, -10],
  },
  {
    position: [6, 0, -10],
  },
  {
    position: [-3, 0, -10],
  },
  {
    position: [-6, 0, -10],
  },
  {
    position: [3, 0, -5],
  },
  {
    position: [6, 0, -5],
  },
  {
    position: [-3, 0, -5],
  },
  {
    position: [-6, 0, -5],
  },
  {
    position: [0, 0, 0],
  },
  {
    position: [3, 0, 0],
  },
  {
    position: [6, 0, 0],
  },
  {
    position: [-3, 0, 0],
  },
  {
    position: [-6, 0, 0],
  },
]
