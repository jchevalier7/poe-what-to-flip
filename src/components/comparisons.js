import React from "react";
import PropTypes from "prop-types";
import { comparisons } from "../functions/config";
import { Comparison } from "./comparison";

export const Comparisons = ({ selectedLeague }) => {
  const comparisonsByGroup = comparisons();

  return (
    	<div className="row">
		<div className="col-10">
			{Object.keys(comparisonsByGroup).map(group => (
			<table id="example" key={group} className="table table-striped tabled-bordered" cellSpacing="0" width="100%">
				<thead>
					<tr>
						<th>Name</th>
						<th>Profit</th>
						<th>Cost</th>
						<th>Comment</th>
					</tr>
				</thead>
				<tbody>
					  {comparisonsByGroup[group].map((comparison, i) => (
					      <Comparison
						selectedLeague={selectedLeague}
						comparison={comparison}
					      />
					  ))}
				</tbody>
			</table>
		      ))}
	      </div>
      </div>
  );
};

Comparisons.propTypes = {
  selectedLeague: PropTypes.string,
};
