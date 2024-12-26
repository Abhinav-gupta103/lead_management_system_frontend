import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import RestaurantInfo from "../components/RestaurantLeads/RestaurantInfo";
import PointOfContactsTable from "../components/PointsOfContact/PointOfContactsTable";

const PointOfContactPage = () => {
  const { restaurantId } = useParams();

  return (
    <Container>
      <h1>Points of Contact for Restaurant ID: {restaurantId}</h1>
      <RestaurantInfo />
      <PointOfContactsTable />
    </Container>
  );
};

export default PointOfContactPage;
