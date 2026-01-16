"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, RefreshCcw, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { title } from "process";
export function DeleteDialog(props) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        "https://fakestoreapi.com/products/" + props.item.id
      );
      if (data) {
        toast("Product deleted successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-95 p-8">
          <DialogTitle className="text-center">
            Delete this product?
          </DialogTitle>
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center gap-3 mt-6">
              <img
                className="w-18 object-contain"
                src={props.item.image}
                alt={props.item.title}
              />
              <span className="text-base text-gray-400">
                {props.item.title}
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-4 pt-4">
            <Button variant="default" onClick={handleDelete} type="submit">
              Delete Product
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function ProductDialog(props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.action === "edit" ? (
          <Button variant="link">
            <Edit />
          </Button>
        ) : (
          <Button variant="default">Add Products</Button>
        )}
      </DialogTrigger>
      <DialogContent className="justify-center flex flex-col">
        <DialogHeader>
          {props.action === "edit" ? (
            <DialogTitle className="pb-6">Edit this product</DialogTitle>
          ) : (
            <DialogTitle className="pb-6"> Add Products</DialogTitle>
          )}
          <DialogDescription>
            <ProfileForm setOpen={setOpen} item={props.item} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm(props) {
  const [formData, setFormData] = useState(
    props.item || {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://fakestoreapi.com/products/" + props.item.id,
        formData
      );
      if (data) {
        toast("products updated successfully!");
        props.setOpen(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://fakestoreapi.com/products",
        formData
      );
      if (data) {
        toast("products added successfully!");
        props.setOpen(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };
  return (
    <form onSubmit={props.item ? handleEdit : handlePost}>
      <FieldSet className="flex flex-col gap-4">
        <FieldGroup className="max-h-300 overflow-y-auto">
          <Field>
            <FieldLabel htmlFor="title">Product Name</FieldLabel>
            <Input
              type="text"
              id="title"
              placeholder="Enter Product Name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="price">Product Price</FieldLabel>
            <Input
              id="price"
              placeholder="Enter Product Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Product Description</FieldLabel>
            <Textarea
              id="description"
              rows={4}
              placeholder="Enter Product Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="category">Product Category</FieldLabel>
            <Input
              id="category"
              placeholder="Enter Product Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="image">Product Image</FieldLabel>
            <Input
              id="image"
              placeholder="Enter Product Image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Field>
          <Button variant="default" className="mt-4" type="submit">
            {props.item ? "Edit Product" : " Add Product"}
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pr-10">
      <div className="mb-10 flex gap-4 justify-end">
        <Button onClick={fetchData} variant="outline">
          <RefreshCcw />
          Refresh
        </Button>
        <ProductDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Description of the product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[3%] wrap-break-word whitespace-normal font-medium">
                <img
                  className="w-10 object-contain"
                  src={item.image}
                  alt={item.title}
                />
              </TableCell>
              <TableCell className="w-[30%] wrap-break-word whitespace-normal font-medium">
                {item.title}
              </TableCell>
              <TableCell className="w-[40%] wrap-break-word whitespace-normal">
                {item.description}
              </TableCell>
              <TableCell className="w-[10%]">{item.category}</TableCell>
              <TableCell className="w-[10%]">{item.price}</TableCell>
              <TableCell className="w-[15%] flex gap-6">
                <ProductDialog action="edit" item={item} />
                <DeleteDialog item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
