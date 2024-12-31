import Buffalo from "../models/Buffalo";
import Cat from "../models/Cat";
import Chicken from "../models/Chicken";
import Cow from "../models/Cow";
import Deer from "../models/Deer";
import Dog from "../models/Dog";
import Duck from "../models/Duck";
import Elephant from "../models/Elephant";
import Frog from "../models/Frog";
import Giraffe from "../models/Giraffe";
import Horse from "../models/Horse";
import Lion from "../models/Lion";
import Mouse from "../models/Mouse";
import Pig from "../models/Pig";
import Rabbit from "../models/Rabbit";
import Sheep from "../models/Sheep";

export const words = [
  {
    type: "animals",
    indonesian: "sapi",
    english: "cow",
    ngoko: "sapi",
    madya: "lembu",
    alus: "lembu",
    image: "/images/vocabularies/animals-cow.jpg",
    model: <Cow scale={5} />,
    colliderSize: [0.7, 1.2, 2.4],
    colliderPosition: [0, 1.2, 0.9],
  },
  {
    type: "animals",
    indonesian: "ayam",
    english: "chicken",
    ngoko: "pitik",
    madya: "pitik",
    alus: "kukus",
    image: "/images/vocabularies/animals-chicken.jpg",
    model: <Chicken scale={0.003} />,
    colliderSize: [0.35, 0.5, 0.35],
    colliderPosition: [0, 0.5, 0],
  },
  {
    type: "animals",
    indonesian: "babi",
    english: "pig",
    ngoko: "celeng",
    madya: "celeng",
    alus: "celeng",
    image: "/images/vocabularies/animals-pig.jpg",
    model: <Pig scale={0.075} />,
    colliderSize: [0.4, 0.6, 1],
    colliderPosition: [0, 0.6, 0.2],
  },
  {
    type: "animals",
    indonesian: "singa",
    english: "lion",
    ngoko: "singo",
    madya: "singo",
    alus: "singo",
    image: "/images/vocabularies/animals-lion.jpg",
    model: <Lion scale={0.9} />,
    colliderSize: [0.5, 1, 1.7],
    colliderPosition: [0, 1, 0.2],
  },
  {
    type: "animals",
    indonesian: "anjing",
    english: "dog",
    ngoko: "asu",
    madya: "asu",
    alus: "segawon",
    image: "/images/vocabularies/animals-dog.jpg",
    model: <Dog scale={0.5} />,
    colliderSize: [0.5, 0.6, 1.2],
    colliderPosition: [0, 0.6, 0],
  },
  {
    type: "animals",
    indonesian: "kucing",
    english: "cat",
    ngoko: "kucing",
    madya: "kucing",
    alus: "kucing",
    image: "/images/vocabularies/animals-cat.jpg",
    model: <Cat scale={2} />,
    colliderSize: [0.2, 0.3, 0.6],
    colliderPosition: [0, 0.3, 0],
  },
  {
    type: "animals",
    indonesian: "tikus",
    english: "mouse",
    ngoko: "tikus",
    madya: "tikus",
    alus: "tikus",
    image: "/images/vocabularies/animals-mouse.jpg",
    model: <Mouse scale={0.7} />,
    colliderSize: [0.1, 0.1, 0.35],
    colliderPosition: [0, 0, 0],
    rigidPositionY: 0.2,
  },
  {
    type: "animals",
    indonesian: "kuda",
    english: "horse",
    ngoko: "jaran",
    madya: "kapal",
    alus: "titihan",
    image: "/images/vocabularies/animals-horse.jpg",
    model: <Horse scale={0.6} />,
    colliderSize: [1.3, 1.2, 0.6],
    colliderPosition: [0.6, -0.5, 0],
    rigidPositionY: 1.75,
  },
  {
    type: "animals",
    indonesian: "bebek",
    english: "duck",
    ngoko: "itik",
    madya: "itik",
    alus: "itik",
    image: "/images/vocabularies/animals-duck.jpg",
    model: <Duck scale={0.6} />,
    colliderSize: [0.4, 1.2, 0.8],
    colliderPosition: [0, 0, 0.2],
  },
  {
    type: "animals",
    indonesian: "gajah",
    english: "elephant",
    ngoko: "gajah",
    madya: "gajah",
    alus: "gajah",
    image: "/images/vocabularies/animals-elephant.jpg",
    model: <Elephant scale={2} />,
    colliderSize: [1, 4.6, 3.8],
    colliderPosition: [0, 0, 1.5],
  },
  {
    type: "animals",
    indonesian: "jerapah",
    english: "giraffe",
    ngoko: "jerapah",
    madya: "jerapah",
    alus: "jerapah",
    image: "/images/vocabularies/animals-giraffe.jpg",
    model: <Giraffe scale={1.75} />,
    colliderSize: [0.7, 4.5, 1.1],
    colliderPosition: [0, 0, -1],
  },
  {
    type: "animals",
    indonesian: "domba",
    english: "sheep",
    ngoko: "wedhus",
    madya: "wedhus",
    alus: "wedhus",
    image: "/images/vocabularies/animals-sheep.jpg",
    model: <Sheep scale={0.3} />,
    colliderSize: [0.4, 1.5, 1.1],
    colliderPosition: [0, 0, 0.3],
  },
  {
    type: "animals",
    indonesian: "kelinci",
    english: "rabbit",
    ngoko: "terwelu",
    madya: "terwelu",
    alus: "terwelu",
    image: "/images/vocabularies/animals-rabbit.jpg",
    model: <Rabbit scale={0.3} />,
    colliderSize: [0.2, 0.45, 0.2],
    colliderPosition: [0, 0, 0],
    rigidPositionY: 0.22,
  },
  {
    type: "animals",
    indonesian: "katak",
    english: "frog",
    ngoko: "kodhok",
    madya: "kodhok",
    alus: "kodhok",
    image: "/images/vocabularies/animals-frog.jpg",
    model: <Frog scale={1} />,
    colliderSize: [0.1, 0.25, 0.15],
    colliderPosition: [0, 0, 0.05],
  },
  {
    type: "animals",
    indonesian: "rusa",
    english: "deer",
    ngoko: "kidang",
    madya: "kidang",
    alus: "kidang",
    image: "/images/vocabularies/animals-deer.jpg",
    model: <Deer scale={0.5} />,
    colliderSize: [0.3, 1.5, 1.2],
    colliderPosition: [0, 0, 0.3],
  },
  {
    type: "animals",
    indonesian: "kerbau",
    english: "buffalo",
    ngoko: "kebo",
    madya: "kebo",
    alus: "kebo",
    image: "/images/vocabularies/animals-buffalo.jpg",
    model: <Buffalo scale={0.38} />,
    colliderSize: [0.45, 2.6, 2.3],
    colliderPosition: [0, 0, 0.75],
  },
];

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
];
