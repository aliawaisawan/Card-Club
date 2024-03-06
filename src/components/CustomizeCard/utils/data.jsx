// import { SerializedPage } from '@lidojs/core';

export const data = [
  {
    layers: {
      ROOT: {
        type: { resolvedName: "RootLayer" },
        props: {
          boxSize: { width: 288, height: 556 },
          position: { x: 0, y: 0 },
          rotate: 0,
          color: "rgb(255, 255, 255)",
          image: {
            url: localStorage.getItem("card"),
            thumb: localStorage.getItem("card"),
            boxSize: {
              width: "100%",
              height: "100%",
            },
          },
        },
        locked: false,
        child: [],
        parent: null,
      },
    },
  },
  {
    layers: {
      ROOT: {
        type: { resolvedName: "RootLayer" },
        props: {
          boxSize: { width: 288, height: 556 },
          position: { x: 0, y: 0 },
          rotate: 0,
          color: "rgb(255, 255, 255)",
          image: null,
        },
        locked: false,
        child: [],
        parent: null,
      },
    },
  },
];
