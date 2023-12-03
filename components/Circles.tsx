import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Canvas,
  Circle,
  Group,
  Line,
  Skia,
  vec,
  useImage,
  Image,
  rect,
  rrect,
  FitBox,
  Path
} from "@shopify/react-native-skia";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { processTransform3d, toMatrix3 } from "react-native-redash";
import { Text } from "react-native";
import { View } from "./Themed";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Chip } from "react-native-paper";
import mockUsers from "../app/mock/MockData";

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const NUM_POINTS = 10;

interface Point {
  innerX: number;
  innerY: number;
  outerX: number;
  outerY: number;
}

function createPoints(): Point[] {
  const points = [];

  const angleStep = (Math.PI * 2) / NUM_POINTS;
  const innerRad = 30;
  const outerRad = 170;

  const middleX = screenWidth / 2;
  const middleY = screenHeight / 2;

  for (let i = 1; i <= NUM_POINTS; i++) {
    const theta = i * angleStep;

    const x = middleX + Math.cos(theta) * innerRad;
    const y = middleY + Math.sin(theta) * innerRad;

    const outerX = middleX + Math.cos(theta) * outerRad;
    const outerY = middleY + Math.sin(theta) * outerRad;

    points.push({
      innerX: x,
      innerY: y,
      outerX,
      outerY,
    });
  }

  return points;
}

interface Props {
  point: Point;
  idx: number;
}

const CirclePair = ({ point, idx }: Props) => {
  const xMidPoint = (point.outerX) / 2 - 15;
  const yMidPoint = (point.outerY) / 2 - 15;
  

  const image = useImage("https://picsum.photos/200/300");
  const size = 120;
  const padding = 0;
  const r = 60
  const roundedRect = rrect(rect(padding, padding, size - padding * 2, size - padding * 2), r, r);

  return (
    <Group key={idx} origin={vec(xMidPoint, yMidPoint)} 
    >
       <Circle
          r={8}
          cx={point.outerX }
          cy={point.outerY }
          color={"red"}
        />
          <Group clip={roundedRect}>
        <Image
          image={image}
          x={point.outerX - 15}
          y={point.outerY - 15}
          width={30}
          height={30}
          fit="cover"
          
        />
        </Group>

    </Group>
  );
};


export const BendingCircle = () => {
  const innerPoints = createPoints();

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {innerPoints.map((point, idx) => {
          return (
            <CirclePair
              key={idx}
              point={point}
              idx={idx}
            />
          );
        })}
        
         <Circle
            r={8}
            cx={screenWidth / 2 }
            cy={screenHeight / 2}
            color={"red"}
          />
      </Canvas>
        <View style={styles.button}>
          <ListOfUsers />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    width: screenWidth,
    height: screenHeight,
  },
  button: {
    position: "absolute",
    bottom: 10
  },
  
});

const ListOfUsers = () => {
    const [users, setUsers] = React.useState(mockUsers);
  
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "500",
            marginBottom: 10,
          }}
        >
          People Near You
        </Text>
        
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {users.map((user, index) => (
            <View style={{ marginRight: 20 }} key={user.id}>
              <Avatar.Image key={index} size={64} source={{ uri: user.avatar }} />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  paddingTop: 5,
                  fontWeight: "600",
                }}
              >
                {user.username}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };