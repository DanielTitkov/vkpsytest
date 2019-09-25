import React, { useState } from "react";
import BarChartProfile from "./BarChartProfile";
import { FormLayout, Select } from "@vkontakte/vkui";
import RadarChartProfile from "./RadarChartProfile";

const ProfileChart = props => {
    const { data } = props;
    const [chartType, setChartType] = useState("bar");
    const handleChange = (e) => {
        setChartType(e.target.value)
    }
    const chart = chartType === "bar" ? <BarChartProfile data={ data } /> : <RadarChartProfile data={ data } />
    return (
        <div>
            { chart }
            { data && data.length > 2 ? (
                <FormLayout>
                    <Select onChange={ handleChange } top="Тип графика" defaultValue="bar">
                        <option value="bar">Столбики</option>
                        <option value="radar">Радар</option>
                    </Select>
                </FormLayout>
            ) : (
                null
            ) }
        </div>
    );
};

export default ProfileChart;
