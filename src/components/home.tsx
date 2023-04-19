import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import {BASE_API_URL, MY_BU_ID, TOKEN} from "../globals";
import {Grade, item} from "../types/api_types";
import {GradeTable} from "./GradeTable";
import Uploader from "./Uploader";

function Home() {
    // You will need to use more of these!
    const [curClassName, setCurClassName] = useState<string>("");
    const [grades, setGrades] = useState<Grade[]>([])
    const [weights, setWeights] = useState([])
    const [shipperList, setShipperList] = useState<string[]>([])
    const [itemDataList, setItemDataList] = useState<item[]>([])

    const fetchItemsData = async (id: string) => {
        const res = await fetch("https://kx473b4cs0.execute-api.us-east-1.amazonaws.com/Prod/items" + "?id=" + id, {
            method: "GET",
            headers: {
                "authorizationToken": TOKEN
            }

        })
        const json = await res.json();
        console.log(json)
        return json
    }

    const fetchShipperInfo = async () => {
        const res = await fetch(BASE_API_URL + "/shippers", {
            method: "GET",
            headers: {
                "authorizationToken": TOKEN,
            }
        })
        const json = await res.json();
        return json
    }

    useEffect(() => {
        fetchShipperInfo().then(r => {
            setShipperList(r.data)
        })
    }, [])

    const handleSelectChange = async (event: SelectChangeEvent) => {
        console.log("Selected shipper: ", event.target)
        const shipperId = event.target.value  // get selected class ID
        const res = await fetchItemsData(shipperId)
        setItemDataList(res)
        // setCurShipperID(shipperId);
    }


    return (
        <div style={{width: "100vw", height: "100vh"}}>
            <Grid container spacing={2} style={{padding: "1rem"}}>
                <Grid xs={12} container alignItems="center" justifyContent="center">
                    <Typography variant="h2" gutterBottom>
                        Spark Assessment
                    </Typography>
                </Grid>
                <Grid xs={12} md={4}>
                    <Typography variant="h4" gutterBottom>
                        Select a shipper according to ID
                    </Typography>
                    <div style={{width: "100%"}}>
                        <Select
                            fullWidth={true}
                            label="Class"
                            onChange={handleSelectChange}
                        >
                            {/* You'll need to place some code here to generate the list of items in the selection */}
                            {shipperList.map((ele) => {
                                return (
                                    <MenuItem
                                        value={ele}
                                    >
                                        {ele}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </Grid>
                <Grid xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>
                        Goods Info
                    </Typography>
                    <div>
                        <GradeTable
                            items={itemDataList}
                            grades={grades}
                            className={curClassName}
                            weights={weights}
                        />
                    </div>
                </Grid>
            </Grid>
            <Uploader/>
        </div>
    );
}

export default Home;
