import React from "react";
import PropTypes from "prop-types";
import { comparePrice, cost } from "../functions/compareItems";
import { useFindItems } from "../contexts/items";
import { isDefined } from "../functions/utils";

export const Comparison = ({ selectedLeague, comparison }) =>
{

	const useCompareText = (baseNames, compareNames) => {
		const baseItems = useFindItems(selectedLeague, baseNames);
		const compareItems = useFindItems(selectedLeague, compareNames);

		let text;

		if (baseItems.concat(compareItems).some(item => !isDefined(item))) {
			text = "N/A";
		} else {
			text = comparePrice(baseItems, compareItems);
		}

		return text;
	};

	const useCostText = names => {
		const pieces = names.length;
		const items = useFindItems(selectedLeague, names);

		let text;
		if (pieces === 0) {
			text = "0";
		} else if (items.some(item => !isDefined(item))) {
			text = "0";
		} else {
			text = `${cost(items)}`;
		}

		return parseInt(text);
	};

	const ComparisonText = () => {
		const comparison_object =
		{
			"name": `${comparison.name}:`,
			"profit": `${useCompareText(comparison.base, comparison.compare)}`,
			"cost": useCostText(comparison.compare),
			"comment": `${comparison.comment}`,
		};
		const ratio = Math.round((comparison_object.profit /
			comparison_object.cost) * 100) / 100;
		const text = <tr><td>{comparison_object.name}</td>
			<td>{comparison_object.profit}</td><td>{comparison_object.cost}</td>
				<td>{comparison_object.comment}</td>
					<td>{ratio}</td></tr>;

		return (text);
	};

	return ComparisonText();
};

Comparison.propTypes = {
comparison: PropTypes.object,
	    selectedLeague: PropTypes.string,
};
