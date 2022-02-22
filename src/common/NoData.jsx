import Card from "./Card";

const NoData = () => {
	return (
		<Card>
			<h3 className="text-success" style={{ flexGrow: 1 }}>
				No data found
			</h3>
		</Card>
	);
};

export default NoData;
