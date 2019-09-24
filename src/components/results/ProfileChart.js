import React from "react";
import BarChartProfile from "./BarChartProfile";

const ProfileChart = props => {
    const { data } = props;
    return (
        <div>
            <BarChartProfile data={data} />
        </div>
    );
};

export default ProfileChart;
