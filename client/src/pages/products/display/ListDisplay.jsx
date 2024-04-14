import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
   
  export function ListDisplay({product}) {
    return (
      <Card className="w-96">
        <List>
          <ListItem className=" hover:bg-slate-200">
            <ListItemPrefix>
              <Avatar variant="circular" alt={product.name} src={product.image} />
            </ListItemPrefix>
            <div className="px-3">
              <Typography variant="h6" color="blue-gray">
                {product.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {product.description}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {product.price}
              </Typography>
            </div>
          </ListItem>
        </List>
      </Card>
    );
  }

  