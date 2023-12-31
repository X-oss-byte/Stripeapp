import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Img,
  Inline,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Select,
} from "@stripe/ui-extension-sdk/ui";
import { BaseView } from "../components/BaseView";

import FiddleLeafFig from "../assets/fiddle-leaf-fig.jpeg";
import FicusAltissima from "../assets/ficus-altissima.jpeg";
import GardeningToolSet from "../assets/gardening-tool-set.jpeg";
import { Product } from "../common/types";

const defaultProducts: Record<string, Product> = {
  "fiddle-leaf-fig": {
    name: "Fiddle Leaf Fig",
    image: FiddleLeafFig,
    selected: false,
    quantity: 1,
  },
  "ficus-altissima": {
    name: "Ficus Altissima",
    image: FicusAltissima,
    selected: false,
    quantity: 2,
  },
  "gardening-tool-set": {
    name: "Gardening Tool Set",
    image: GardeningToolSet,
    selected: false,
    quantity: 1,
  },
};
const dropdownQuantity = Array.from({ length: 10 }, (_, n) => n + 1);

const ConsoleView = () => {
  const [products, setProducts] = useState(defaultProducts);
  const navigate = useNavigate();
  return (
    <BaseView
      title="Label printer"
      footer={<Box>Hi</Box>}
      actions={
        <Button
          type="primary"
          css={{
            width: "fill",
            alignX: "center",
          }}
          onPress={() => navigate("/shipment")}
        >
          Add product
        </Button>
      }
    >
      {/* View content */}
      <Box
        css={{
          stack: "y",
          gap: "small",
        }}
      >
        <Inline css={{ font: "heading" }}>Create a fullfillment</Inline>
        Select products to add to a fullfillment
      </Box>
      {/* Product table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell width="maximized">
              <Checkbox
                onChange={(e) => {
                  const productsUpdate = Object.assign({}, products);
                  Object.keys(productsUpdate).map((id) => {
                    const product = productsUpdate[id];
                    product.selected = e.target.checked;
                  });
                  setProducts(productsUpdate);
                }}
                checked={Object.values(products).every(
                  (product) => product.selected
                )}
              />
              Product
            </TableHeaderCell>
            <TableHeaderCell>QTY</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(products).map((id) => {
            const product = products[id];
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box
                    css={{
                      stack: "x",
                      gap: "small",
                      alignY: "center",
                      alignX: "start",
                    }}
                  >
                    <Checkbox
                      onChange={(e) => {
                        product.selected = e.target.checked;
                        setProducts({ ...products, [id]: product });
                      }}
                      checked={product.selected}
                    />
                    <Box
                      css={{
                        borderRadius: "medium",
                        overflow: "hidden",
                        width: "fit",
                        display: "grid",
                      }}
                    >
                      <Img
                        src={product.image}
                        height="40"
                        width="40"
                        alt={product.name}
                      />
                    </Box>
                    {product.name}
                  </Box>
                </TableCell>
                <TableCell vAlign="middle">
                  <Select
                    name="quantity"
                    aria-label="product quantity dropdown"
                    css={{
                      width: "max",
                    }}
                  >
                    <option value={0}>-</option>
                    {dropdownQuantity.map((x, index) => {
                      return (
                        <option
                          key={index}
                          value={x}
                          selected={x === product.quantity ? true : false}
                        >
                          {String(x)}
                        </option>
                      );
                    })}
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box
        css={{
          marginTop: "medium",
        }}
      >
        <Button
          onPress={() => navigate(-1)}
          css={{
            alignX: "center",
            width: "fill",
          }}
        >
          Cancel
        </Button>
      </Box>
    </BaseView>
  );
};

export default ConsoleView;
