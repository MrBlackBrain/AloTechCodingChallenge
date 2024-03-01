import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// Send A post request to the server
const sendPostRequest = async (
  title: string,
  category: string,
  setNews: { (value: SetStateAction<never[]>): void; (arg0: never[]): void }
) => {
  setNews([]);
  if (category === "all") {
    category = "";
  }

  try {
    const resp = await fetch("https://function-1-zkny6ty2zq-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
      }),
    });
    const data = await resp.json();
    setNews(data);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

function App() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("https://function-1-zkny6ty2zq-uc.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "",
        category: "",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div className="text-start">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of BBC News from the server
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
        <>
          <div className="flex flex-row justify-between">
            <Input
              placeholder="Filter title..."
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-[150px] lg:w-[250px]"
            />
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="sport">Sport</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={() => sendPostRequest(title, category, setNews)}>
              Send Post Request
            </Button>
          </div>
          <div className="grid gap-4 ">
            <Card className="">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={news}>
                    <XAxis
                      dataKey="ID"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value: any) => `${value}`}
                    />
                    <Bar
                      dataKey="Count"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Table>
            <TableCaption>A list of 50 BBC News</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map(
                (
                  row: {
                    ID: string;
                    Count: string;
                    Title: string;
                    Category: string;
                  },
                  index: number
                ) => (
                  <TableRow key={`${row.Title}-${index}`}>
                    <TableCell className="font-medium">{row.ID}</TableCell>
                    <TableCell className="font-medium">
                      {row.Category}
                    </TableCell>
                    <TableCell>{row.Title}</TableCell>
                    <TableCell className="font-medium">{row.Count}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;
