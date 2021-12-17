import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import API_URL from "../config/API_URL";
import { AirbnbRating } from "react-native-elements";
import { Rating } from "react-native-elements";
export default function ContractsListCard({
  userId,
  id,
  itemName,
  itemId,
  fromid,
  from,
  toid,
  to,
  price,
  days,
  status,
  rating,
  reload,
  setReload,
}) {
  console.log(rating)
  const [ratingScore, setratingScore] = React.useState(5);
  const [ratingFeedback, setratingFeedback] = React.useState("");
  const [avgrating, setAvgRating] = React.useState(0.00);
  const client = axios.create({
    baseURL: API_URL,
  });
  const rejejectOffer = async () => {
    await client.put(`/contract/reject`, { contract_id: id }).then(
      (response) => {
        console.log(response["request"]["_response"]);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
    setReload(true);
  };
  const acceptOffer = async () => {
    await client
      .put(`/contract/accept`, { contract_id: id, item_id: itemId })
      .then(
        (response) => {
          console.log(response["request"]["_response"]);
        },
        (response) => {
          console.log(response["request"]["_response"]);
        }
      );
    setReload(true);
  };
  const returnItem = async () => {
    await client
      .put(`/contract/returnitem`, { contract_id: id, item_id: itemId })
      .then(
        (response) => {
          console.log(response["request"]["_response"]);
        },
        (response) => {
          console.log(response["request"]["_response"]);
        }
      );
    setReload(true);
  };
  const receviedItem = async () => {
    await client.put(`/contract/end`, { contract_id: id }).then(
      (response) => {
        console.log(response["request"]["_response"]);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
    setReload(true);
  };
  // const userRating=async()=> 
  // {
  //   let uid=(toid!=userId)?toid:fromid;
  //   console.log(uid);
  //   await client.get(`/contract/getrating?userid=${uid}`).then(
  //     (response) => {
  //       let ratings = response["data"];
  //       let stars=[0,0,0,0,0];
  //       for (let i = 0; i < ratings.length; i++) {
  //         stars[ratings[i].score-1]++;
  //       }
  //       let avgrating=(1*stars[0]+2*stars[1]+3*stars[2]+4*stars[3]+5*stars[4])/ratings.length;
  //       setAvgRating(avgrating)
  //     },
  //     (response) => {
  //       console.log(response["request"]["_response"]);
  //     }
  //   );
  // }
  const giveRating = async () => {
    await client
      .post(`/contract/rating`, {
        user_id: toid,
        contract_id: id,
        score: ratingScore,
        feedback: ratingFeedback,
      })
      .then(
        (response) => {
          console.log(response["request"]["_response"]);
        },
        (response) => {
          console.log(response["request"]["_response"]);
        }
      );
    setReload(true);
  };
  
  let button;
  if (status == "active") {
    if (userId == toid) {
      button = (
        <Button
          icon="rotate-left"
          color="green"
          mode="contained"
          onPress={() => {
            returnItem();
            console.log("button reload");
            setReload(true);
          }}
        >
          Return the item
        </Button>
      );
    } else {
      button = (
        <Button color="#90ee90" mode="contained">
          Contract is Active
        </Button>
      );
    }
  } else if (status == "pending") {
    if (userId == toid) {
      button = (
        <Button
          color="#eed202"
          mode="contained"
          onPress={() => {}}
          disabled={true}
        >
          Your Contract is in Pending
        </Button>
      );
    } else {
      button = (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            icon="check"
            color="green"
            mode="contained"
            width="50%"
            compact={true}
            onPress={() => {
              acceptOffer();
            }}
          >
            Accept Offer
          </Button>
          <Button
            icon="close"
            color="#c70000"
            mode="contained"
            width="50%"
            compact={true}
            onPress={() => {
              rejejectOffer();
            }}
          >
            Reject Offer
          </Button>
        </View>
      );
    }
  } else if (status == "onhold") {
    if (userId == toid) {
      button = (
        <Button
          icon="account-arrow-left"
          color="#eed202"
          mode="contained"
          onPress={() => {}}
        >
          Wait for Confirmation
        </Button>
      );
    } else {
      button = (
        <Button
          icon="account-arrow-left"
          color="lightgreen"
          mode="contained"
          onPress={() => {
            receviedItem();
          }}
        >
          Press if you recevied your item
        </Button>
      );
    }
  } else if (status == "rejected") {
    if (userId == toid) {
      button = (
        <Button
          icon="close-octagon"
          color="#eed202"
          mode="contained"
          onPress={() => {}}
          disabled={true}
        >
          Sorry, your offer got rejected
        </Button>
      );
    } else {
      button = (
        <Button
          icon="close-octagon"
          color="#eed202"
          mode="contained"
          onPress={() => {}}
          disabled={true}
        >
          rejected
        </Button>
      );
    }
  } else if (status == "completed") {

      button = (
        <Button icon="file" color="green" mode="contained" onPress={() => {}}>
          Contract Completed
        </Button>
      );
    }
    else if(status == "not rated") {
      
        button = (
          <View>
            <View style={{ alignItems: "center" }}>
              <AirbnbRating
                onFinishRating={(value) => {
                  setratingScore(value);
                }}
                showRating
                count={5}
                reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing"]}
                defaultRating={ratingScore}
                size={22}
              />

              <TextInput
                borderWidth={2}
                borderColor="grey"
                padding={10}
                marginVertical={0}
                height={60}
                width="96%"
                backgroundColor={"#fff"}
                placeholder="Feedback"
                value={ratingFeedback}
                multiline={true}
                onChangeText={(text) => {
                  setratingFeedback(text);
                }}
              />
            </View>
            <Button
              style={{ marginTop: 15 }}
              icon="file"
              color="green"
              mode="contained"
              onPress={() => {
                giveRating();
              }}
            >
              Sumbit
            </Button>
          </View>
        );
              
      
    
  }
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => {}}>
        {status == "active" ? (
          <View
            style={{
              marginTop: 5,
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="time-outline" size={20} color="#02055a" />

            <Text style={{ textTransform: "uppercase", color: "#02055a" }}>
              {days} Days left
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.cardHeader}>
          <Ionicons name="cube-outline" size={30} color="black" />
          <Text style={{ marginLeft: 10 }}>{itemName}</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="person-outline" size={30} color="black" />
            <Text>{userId != toid ? to : from}</Text>
            <Rating
              style={{ marginLeft: 4 }}
              type="star"
              readonly
              //Set Rating out of 5 Here
              startingValue={rating}
              //Dont change the Rating Count
              ratingCount={5}
              imageSize={16}
              fractions={1}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="cash-outline" size={30} color="green" />
            <Text
              style={{
                color: "green",
              }}
            >
              {price + " Rs"}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="person-outline" size={30} color="black" />
            <Text>{userId == toid ? to : from}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {button}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.85,
    borderRadius: 6,
    elevation: 6,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginHorizontal: 8,
    marginVertical: 10,
    position: "relative",
    borderColor: "grey",
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 18,
    marginVertical: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
