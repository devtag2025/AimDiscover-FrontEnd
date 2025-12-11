import React from "react";
import { Clock } from "lucide-react";




const SpikeTime = ({ spike_started_at }) => {


 

  return (
    <span className="flex items-center gap-1">
      <Clock className="w-3 h-3" />
    {spike_started_at}
    </span>
  );
};

export default SpikeTime;
