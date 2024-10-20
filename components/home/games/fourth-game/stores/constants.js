import Buffalo from "../models/Buffalo"
import Cat from "../models/Cat"
import Chicken from "../models/Chicken"
import Cow from "../models/Cow"
import Deer from "../models/Deer"
import Dog from "../models/Dog"
import Duck from "../models/Duck"
import Elephant from "../models/Elephant"
import Frog from "../models/Frog"
import Giraffe from "../models/Giraffe"
import Horse from "../models/Horse"
import Lion from "../models/Lion"
import Mouse from "../models/Mouse"
import Pig from "../models/Pig"
import Rabbit from "../models/Rabbit"
import Sheep from "../models/Sheep"

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
    madya: "asu",
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
    alus: "kucing",
    model: <Cat scale={2} />,
    colliderSize: [0.2, 0.3, 0.6],
    colliderPosition: [0, 0.3, 0],
  },
  {
    indonesian: "tikus",
    english: "mouse",
    ngoko: "tikus",
    madya: "tikus",
    alus: "tikus",
    model: <Mouse scale={0.7} />,
    colliderSize: [0.1, 0.1, 0.35],
    colliderPosition: [0, 0, 0],
    rigidPositionY: 0.2,
  },
  {
    indonesian: "kuda",
    english: "horse",
    ngoko: "jaran",
    madya: "kapal",
    alus: "titihan",
    model: <Horse scale={0.6} />,
    colliderSize: [1.3, 1.2, 0.6],
    colliderPosition: [0.6, -0.5, 0],
    rigidPositionY: 1.75,
  },
  {
    indonesian: "bebek",
    english: "duck",
    ngoko: "itik",
    madya: "itik",
    alus: "itik",
    model: <Duck scale={0.6} />,
    colliderSize: [0.4, 1.2, 0.8],
    colliderPosition: [0, 0, 0.2],
  },
  {
    indonesian: "gajah",
    english: "elephant",
    ngoko: "gajah",
    madya: "gajah",
    alus: "gajah",
    model: <Elephant scale={2} />,
    colliderSize: [1, 4.6, 3.8],
    colliderPosition: [0, 0, 1.5],
  },
  {
    indonesian: "jerapah",
    english: "giraffe",
    ngoko: "jerapah",
    madya: "jerapah",
    alus: "jerapah",
    model: <Giraffe scale={1.75} />,
    colliderSize: [0.7, 4.5, 1.1],
    colliderPosition: [0, 0, -1],
  },
  {
    indonesian: "domba",
    english: "sheep",
    ngoko: "wedhus",
    madya: "wedhus",
    alus: "wedhus",
    model: <Sheep scale={0.3} />,
    colliderSize: [0.4, 1.5, 1.1],
    colliderPosition: [0, 0, 0.3],
  },
  {
    indonesian: "kelinci",
    english: "rabbit",
    ngoko: "terwelu",
    madya: "terwelu",
    alus: "terwelu",
    model: <Rabbit scale={0.3} />,
    colliderSize: [0.2, 0.45, 0.2],
    colliderPosition: [0, 0, 0],
    rigidPositionY: 0.22,
  },
  {
    indonesian: "katak",
    english: "frog",
    ngoko: "kodhok",
    madya: "kodhok",
    alus: "kodhok",
    model: <Frog scale={1} />,
    colliderSize: [0.1, 0.25, 0.15],
    colliderPosition: [0, 0, 0.05],
  },
  {
    indonesian: "rusa",
    english: "deer",
    ngoko: "kidang",
    madya: "kidang",
    alus: "kidang",
    model: <Deer scale={0.5} />,
    colliderSize: [0.3, 1.5, 1.2],
    colliderPosition: [0, 0, 0.3],
  },
  {
    indonesian: "kerbau",
    english: "buffalo",
    ngoko: "kebo",
    madya: "kebo",
    alus: "kebo",
    model: <Buffalo scale={0.38} />,
    colliderSize: [0.45, 2.6, 2.3],
    colliderPosition: [0, 0, 0.75],
  },
]

export const positions = [
  {
    position: [0, 0, -15],
  },
  {
    position: [4, 0, -15],
  },
  {
    position: [8, 0, -15],
  },
  {
    position: [-4, 0, -15],
  },
  {
    position: [-8, 0, -15],
  },
  {
    position: [0, 0, -10],
  },
  {
    position: [4, 0, -10],
  },
  {
    position: [8, 0, -10],
  },
  {
    position: [-4, 0, -10],
  },
  {
    position: [-8, 0, -10],
  },
  {
    position: [4, 0, -5],
  },
  {
    position: [8, 0, -5],
  },
  {
    position: [0, 0, -5],
  },
  {
    position: [-4, 0, -5],
  },
  {
    position: [-8, 0, -5],
  },
  {
    position: [0, 0, 0],
  },
  {
    position: [4, 0, 0],
  },
  {
    position: [8, 0, 0],
  },
  {
    position: [-4, 0, 0],
  },
  {
    position: [-8, 0, 0],
  },
  {
    position: [4, 0, 5],
  },
  {
    position: [8, 0, 5],
  },
  {
    position: [0, 0, 5],
  },
  {
    position: [-4, 0, 5],
  },
  {
    position: [-8, 0, 5],
  },
]
