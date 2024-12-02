"use client";
import React, { useState } from "react";


const jsonData = {
  "outside": {
    "odor": ["Odor", "No odor"],
    "foaming": ["Foam", "No foam"],
    "crack_of_manholes": ["Obvious", "Not found"],
    "noise": ["Noisy", "Slightly"]
  },
  "pumps": {
    "raw_water_pump": {
      "switch": ["MAN", "OFF", "AUTO"],
      "condition": ["Normal", "Alarm: Thermal trip / Leakage"],
      "insulation_resistance_MΩ": null
    },
    "effluent_pump": {
      "switch": ["MAN", "OFF", "AUTO"],
      "condition": ["Normal", "Alarm: Thermal trip / Leakage"],
      "insulation_resistance_MΩ": null
    }
  },
  "control_panel": {
    "alarm_system": ["On", "NA"],
    "power_supply": ["Single", "Three"]
  },
  "hour_meter": {
    "last": "hr",
    "current": "hr",
    "difference": "hr",
    "total_time": "hr",
    "pump_capacity": "L/min",
    "total_water_vol": "m³",
    "duration": "days",
    "average": "m³/D"
  },
  "blower_condition": {
    "vibration": ["Yes", "No"],
    "heating": ["Heated", "Normal"],
    "air_leakage": ["Yes", "Not found", "Improved"]
  },
  "tap_water_meter": {
    "last_time": "m³",
    "this_time": "m³",
    "difference": "m³",
    "duration": "days",
    "average_of_this_time": "m³/D"
  },
  "water_level": {
    "from_manholes": {
      "sedimentation_and_separation_chamber": "mm",
      "anaerobic_contact_media_chamber": "mm",
      "sedimentation_chamber": "mm"
    }
  },
  "water_lifted": {
    "sediment_and_separation_chamber": ["No", "Yes"],
    "anaerobic_contact_media_chamber": ["No", "Yes"],
    "moving_bed_chamber": ["No", "Yes"],
    "sedimentation_chamber": ["No", "Yes"]
  },
  "take_photos": {
    "sedimentation_and_separation_chamber": ["No", "Yes"],
    "anaerobic_contact_media_chamber": ["No", "Yes"],
    "moving_bed_chamber": ["No", "Yes"],
    "sedimentation_chamber": ["No", "Yes"],
    "chlorine_dispenser": ["No", "Yes"],
    "water_samples": ["No", "Yes"]
  },
  "measurements": {
    "disinfection_chamber": {
      "pH": null,
      "residual_cl_mg_L": null,
      "transparency_cm": null,
      "do_mg_L": null,
      "temperature_C": null,
      "rate_of_moving_bed_percent": null,
      "NH4_N_mg_L": null
    },
    "sedimentation_chamber": {},
    "moving_bed_chamber": {},
    "raw_water": {}
  },
  "scum_and_sludge": {
    "sedimentation_chamber": {
      "scum": "cm (%)",
      "sludge": "cm"
    },
    "anaerobic_contact_media_chamber": {
      "scum": "cm (%)",
      "sludge": "cm"
    },
    "separation_box": {
      "scum": "cm (%)",
      "sludge": "cm"
    },
    "sedimentation_and_separation_chamber": {
      "scum": "cm (%)",
      "sludge": "cm"
    }
  },
  "circulation_volume": {
    "before_maintenance": "m³/D",
    "after_adjustment": "m³/D"
  },
  "disinfection_chamber_and_chlorine_dispenser": {
    "chlorine_tablet_dissolved": ["Fine", "NG", "Improved"],
    "remaining_amount_of_chlorine_tablet_percent": "%",
    "number_of_discs_inside": ["0", "1", "2"],
    "replenish_chlorine_tablet": ["pcs", "kg"]
  },
  "sedimentation_chamber_measuring_box": {
    "ss_contained_with_treated_water": ["Not found", "Contained"],
    "transfer_scum_via_measuring_box": ["Done", "Not yet"],
    "cleaning_of_measuring_box": ["Fine", "NG", "Improved"],
    "transfer_settled_sludge_by_airlift": ["Done", "Not yet"],
    "cleaning_of_circulation_pipe": ["Fine", "NG", "Improved"],
    "other_abnormal_condition": ["NA", "Found", "Improved"]
  },
  "moving_bed_chamber": {
    "aeration_and_mixing_condition": ["Fine", "NG", "Improved"],
    "biofilm_condition": ["A", "B", "C", "D"],
    "foaming": ["Not yet", "Partly", "Up to cover"],
    "other_abnormal_condition": ["NA", "Found", "Improved"]
  },
  "anaerobic_contact_media_chamber": {
    "remove_garbage": ["NA", "Done", "Not yet"],
    "ss_going_out_of_baffle": ["NA", "Went out"],
    "other_abnormal_condition": ["NA", "Found", "Improved"]
  },
  "sedimentation_and_separation_chamber": {
    "remove_garbage": ["NA", "Done", "Not yet"],
    "remove_scum_from_separation_box": ["NA", "Done", "Not yet"],
    "other_abnormal_condition": ["NA", "Found", "Improved"]
  },
  "clean_inside_of_each_chamber_wall": {
    "sedimentation_and_separation_chamber": ["Done", "Not yet"],
    "anaerobic_contact_media_chamber": ["Done", "Not yet"],
    "moving_bed_chamber": ["Done", "Not yet"],
    "sedimentation_chamber": ["Done", "Not yet"],
    "measuring_box_circulation_device": ["Done", "Not yet"],
    "disinfection_chamber_and_chlorine_dispenser": ["Done", "Not yet"]
  },
  "raw_water_tank": {
    "agitation_condition": ["Fine", "NG", "Improved"],
    "float_switch_operation": ["Fine", "NG", "Improved"],
    "pump_operation": ["Work", "N/W", "Improved"],
    "remove_garbage_and_cleaning": ["Done", "Not yet"]
  },
  "effluent_pump_tank": {
    "garbage_or_settled_sludge": ["None", "Removed"],
    "float_switch_operation": ["Fine", "NG", "Improved"],
    "pump_operation": ["Work", "N/W", "Improved"]
  },
  "agitation_blower": {
    "type": null,
    "cleaning_of_air_filter": ["Done", "Not yet"],
    "operating_total": "e.g. 3/4"
  },
  "main_blower": {
    "type": null,
    "cleaning_of_air_filter": ["Done", "Not yet"],
    "operating_total": "e.g. 3/4"
  },
  "checkoutside": ["Cleaning", "Close Manholes", "Lock Control Panel", "Collect All Equipment"],
  "remarks": null
}

type JsonData = { [key: string]: string | object | null };

const MultiStepForm: React.FC<{ data: JsonData }> = ({ data }) => {
  const steps = Object.entries(data); // Extract steps from JSON data
  const [currentStep, setCurrentStep] = useState(0); // Track current step
  const [formData, setFormData] = useState<JsonData>({}); // Store all form inputs

  const handleChange = (key: string, value: null | string | object ) => {
    console.log("from data",JSON.stringify(formData))
    
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const fromAlldata =formData;
  const renderStepFields = (stepKey: string, stepValue: object) => {
    if (Array.isArray(stepValue)) {
      // Render dropdown for array values
      return (
        <div key={stepKey} className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {stepKey}
          </label>
          <select
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            onChange={(e) => handleChange(stepKey, e.target.value)}
          >
            <option value="">Select {stepKey}</option>
            {stepValue.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    } else if (typeof stepValue === "object" && stepValue !== null) {
      // Recursively render nested objects
      return (
        <div key={stepKey} className="mb-4">
          <fieldset className="border border-gray-300 rounded-md p-4">
            <legend className="text-lg font-semibold">{stepKey}</legend>
            {Object.entries(stepValue).map(([subKey, subValue]) =>
              renderStepFields(subKey, subValue)
            )}
          </fieldset>
        </div>
      );
    } else {
      // Render input for other types
      return (
        <div key={stepKey} className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            {stepKey}
          </label>
          <input
            type="text"
            placeholder={`Enter ${stepKey}`}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
            onChange={(e) => handleChange(stepKey, e.target.value)}
          />
        </div>
      );
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you!");
  };

  const [stepKey, stepValue] = steps[currentStep];

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Step {currentStep + 1} of {steps.length}
      </h2>
      <h3 className="text-lg font-semibold text-blue-600 mb-6">{stepKey}</h3>
      {renderStepFields(stepKey, stepValue as object)}

      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300"
            onClick={handlePrevious}
          >
            Previous
          </button>
        )}
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-8">
        Multi-Step STP Form
      </h1>
      <MultiStepForm data={jsonData} />
    </div>
  );
}