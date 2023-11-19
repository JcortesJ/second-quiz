import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"
import {Chart, ArcElement,CategoryScale,defaults,registerables} from 'chart.js'


import { useState } from 'react';


const Graphics = (props: any[]) => {
    Chart.register(CategoryScale);
    Chart.register(ArcElement);
    Chart.register(...registerables);
    defaults.font.family = 'Inter', 'sans';
    defaults.font.weight = '800';
    // props = [deadTrees,liveTrees,removedTrees,noStatTrees,speciesSample,statesSample]
    // speciesSample = {species: diameter, height, population}
    // statesSample = {population}
    const dataPieS = {
        labels: ["Dead trees", "Live trees", "Removed trees", "No status"],
        datasets: [{
            label: 'Number of trees',
            data: [props[0],props[1],props[2],props[3]],
            backgroundColor: [
                "rgb(236, 143, 94)",
                "rgb(159, 187, 115)",
                "rgb(243, 182, 100)",
                "rgb(241, 235, 144)"

            ],
            borderColor: [
                    "rgb(236, 143, 94)",
                    "rgb(159, 187, 115)",
                    "rgb(243, 182, 100)",
                    "rgb(241, 235, 144)"
            ],
            borderWidth: 1
        }],
    };
    //calculate of the species and its data
    let species = []
    let heights = []
    let diameters = []
    let population = []
    let states = []
    let num = []
    for (var c in props[4]) {
        if (props[4].hasOwnProperty(c)) {
          species.push(c)
          heights.push(props[4][c][1][0])
          diameters.push(props[4][c][0][0])
          population.push(props[4][c][2])
        }
      }
    for (var s in props[5]){
        if (props[5].hasOwnProperty(s)) {
            states.push(s)
            num.push(props[5][s])
        }
    }
    const dataPieSt = {
        labels: states,
        datasets: [{
            label: 'Number of trees',
            data: num,
            backgroundColor: [
                "rgb(236, 143, 94)",
                "rgb(159, 187, 115)",
                "rgb(243, 182, 100)",
                "rgb(241, 235, 144)"

            ],
            borderColor: [
                    "rgb(236, 143, 94)",
                    "rgb(159, 187, 115)",
                    "rgb(243, 182, 100)",
                    "rgb(241, 235, 144)"
            ],
            borderWidth: 1
        }],
    };

    const dataD = {
        labels: species,
        datasets: [{
            label: 'inches',
            data: diameters,
            backgroundColor: [
                "rgb(236, 143, 94)",
                "rgb(3, 168, 160)",
                "rgb(243, 182, 100)",
                "rgb(241, 235, 144)",
                "rgba(75,192,192,1)",
                "#ADE80C",
                "#7150AF",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: [
                    "rgb(236, 143, 94)",
                    "rgb(159, 187, 115)",
                    "rgb(243, 182, 100)",
                    "rgb(241, 235, 144)"
            ],
            borderWidth: 1
        }],
    };

    const dataH = {
        labels: species,
        datasets: [{
            label: 'inches',
            data: heights,
            backgroundColor: [
                "rgb(236, 143, 94)",
                "rgb(3, 168, 160)",
                "rgb(243, 182, 100)",
                "rgb(241, 235, 144)",
                "rgb(255, 9, 132)",
                "rgb(33, 64, 154)",
                "#ADE80C",
                "#7150AF",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: [
                    "rgb(236, 143, 94)",
                    "rgb(159, 187, 115)",
                    "rgb(243, 182, 100)",
                    "rgb(241, 235, 144)"
            ],
            borderWidth: 1
        }],
    };
    const dataN = {
        labels: species,
        datasets: [{
            label: 'number of trees',
            data: num,
            backgroundColor: [
                "rgb(236, 143, 94)",
                "rgb(3, 168, 160)",
                "rgb(243, 182, 100)",
                "rgb(241, 235, 144)",
                "rgb(255, 9, 132)",
                "rgb(33, 64, 154)",
                "rgb(241, 235, 144)",
                "rgba(75,192,192,1)",
                "#ADE80C",
                "#7150AF",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: [
                    "rgb(236, 143, 94)",
                    "rgb(159, 187, 115)",
                    "rgb(243, 182, 100)",
                    "rgb(241, 235, 144)"
            ],
            borderWidth: 1
        }],
    };
    return (

        <div>
            <h3>Current status of the tree(s) </h3>
            <Pie data={dataPieS} className={styles.graph} options={{responsive: true}} />
            <h3>Average diameter by species </h3>
            <Bar data={dataD} className={styles.graph} options={{responsive: true}}/>
            <h3>Average height by species </h3>
            <Bar data={dataH} className={styles.graph} options={{responsive: true}}/>
            <h3>Number of trees by species </h3>
            <Bar data={dataN} className={styles.graph} options={{responsive: true}}/>
            <h3>Data collected from states </h3>
            <Doughnut data={dataPieSt} className={styles.graph} options={{responsive: true}}/>
                        
        </div>
    );
}

export default Graphics;