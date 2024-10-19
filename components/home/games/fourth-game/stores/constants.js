import Cat from "../models/Cat"
import Chicken from "../models/Chicken"
import Cow from "../models/Cow"
import Dog from "../models/Dog"
import Lion from "../models/Lion"
import Pig from "../models/Pig"

export const words = [
  {
    indonesian: "sapi",
    english: "cow",
    ngoko: "sapi",
    madya: "lembu",
    alus: "lembu",
    model: <Cow scale={5} />,
    colliderSize: [0.7, 1.2, 2.4],
    colliderPosition: [0, 1.2, 0.9],
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
  {
    indonesian: "babi",
    english: "pig",
    ngoko: "celeng",
    madya: "celeng",
    alus: "celeng",
    model: <Pig scale={0.075} />,
    colliderSize: [0.4, 0.6, 1],
    colliderPosition: [0, 0.6, 0.2],
  },
  {
    indonesian: "singa",
    english: "lion",
    ngoko: "singo",
    madya: "singo",
    alus: "singo",
    model: <Lion scale={0.9} />,
    colliderSize: [0.5, 1, 1.7],
    colliderPosition: [0, 1, 0.2],
  },
  {
    indonesian: "anjing",
    english: "dog",
    ngoko: "asu",
    madya: "asuw",
    alus: "segawon",
    model: <Dog scale={0.5} />,
    colliderSize: [0.5, 0.6, 1.2],
    colliderPosition: [0, 0.6, 0],
  },
  {
    indonesian: "kucing",
    english: "cat",
    ngoko: "kucing",
    madya: "kucing",
    alus: "marmot",
    model: <Cat scale={2} />,
    colliderSize: [0.2, 0.3, 0.6],
    colliderPosition: [0, 0.3, 0],
  },
  // {
  //   indonesian: "kuda",
  //   english: "horse",
  //   ngoko: "jaran",
  //   madya: "jaran",
  //   alus: "kebo",
  // },
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
