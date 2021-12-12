import React, { useEffect } from "react";
import { FlatList } from "react-native";
import API_URL from "../config/API_URL";
import Card from "../components/Card";
//new
let data = [
  {
    id: 1,
    name: "Product 1dsdsddssdsdsdsdsdsdsdsddsdsdsdsdsdsddsddsdddsdsdsdsdsdsddssdsdddsdds",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "100",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "200",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 3,
    name: "Product 3",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "300",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 4,
    name: "Product 4",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "400",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 5,
    name: "Product 5",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "500",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 6,
    name: "Product 6",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "600",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 7,

    name: "Product 7",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "700",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 8,
    name: "Product 8",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "800",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 9,
    name: "Product 9",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "900",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 10,
    name: "Product 10",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1000",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 11,
    name: "Product 11",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1100",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 12,
    name: "Product 12",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1200",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
];

// export default function List({
//   category,
//   area,
//   min,
//   max,
//   query,
//   viewItem,
//   reload, //New
//   setReload, //New
// }) {
//   useEffect(() => {
//     //New
//     if (!reload) {
//       return;
//     }
//     //New

//     console.log(category, area, min, max, query);
//     setReload(false);
//   }, [category, area, min, max, query, reload]);
// //new
import axios from "axios";
export default function List({ userId, category, area, min, max, query,viewItem,reload,setReload }) {
  const [itemdata, setitemdata] = React.useState([]);
  useEffect(() => {
    if (!reload) {
            return;
    }
    const client = axios.create({
      baseURL: API_URL,
    });
    client
      .get(
        `/search?userid=${userId}&area=${area}&name=${query}&min=${min}&max=${max}&category=${category}`
      )
      .then(
        (response) => {
          let search_data = response["data"];
          let data1 = [];
          for (let i = 0; i < search_data.length; i++) {
            let img =
              search_data[i].image_url != ""
                ? search_data[i].image_url
                : "notfound.png";
            data1.push({
              userid: search_data[i].user_id,
              username: search_data[i].username,
              id: search_data[i].item_id,
              name: search_data[i].item_name,
              description: search_data[i].description,
              price: search_data[i].price,
              image: API_URL + "/images/" + img,
              area: search_data[i].area_name,
              category: search_data[i].cate_id,
            });
          }
          setitemdata(data1);
        },
        (response) => {
          console.log(response);
        }
      );
      console.log(category, area, min, max, query);
      setReload(false);
  }, [category, area, min, max, query]);


  return (
    <FlatList
      numColumns={2}
      style={{
        width: "100%",
      }}
      data={itemdata}
      renderItem={({ item, index }) => (
        <Card
          userid={item.userid}
          id={item.id}
          username={item.username}
          name={item.name}
          area={item.area}
          description={item.description}
          price={item.price}
          category={item.category}
          viewItem={viewItem} //New
          imageURL={item.image}

        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
