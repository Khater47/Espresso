class Trend {
	constructor(
		trend_id,
		title,
		tags,
		time_needed,
		textual_input,
		media_location,
		creation_date,
		last_updated,
		ranking
	) {
		this.trend_id = trend_id;
		this.title = title;
		this.tags = tags;
		this.time_needed = time_needed;
		this.textual_input = textual_input;
		this.media_location = media_location;
		this.creation_date = creation_date;
		this.last_updated = last_updated;
		this.ranking = ranking;
	}
}

module.exports = Trend;
