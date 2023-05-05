import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from 'lodash';
import { API_URL } from '../constant'


function GetStats() {
    const [statData, setStatData] =  useState([]);

    useEffect(() => {
        fetch(API_URL + 'gettrainings')
        .then(response => {
            if (response.ok){
                return response.json()
            } else{
                alert('Something went wrong in GET request when fetching customers')
            }       
        })
        .then(data => {
            let output = _(data)
                        .groupBy('activity')
                        .map((objs, key) => ({
                            'activity': key,
                            'duration': _.sumBy(objs, 'duration') }))
                        .value()
            setStatData(output);
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <BarChart width={900} height={500} data={statData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="duration" fill="#50C5B7" />
            </BarChart>
        </div>
    );
}


export default GetStats;
