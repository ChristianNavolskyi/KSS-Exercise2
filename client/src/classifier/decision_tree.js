const DecisionTreeClassifier = function () {

	const findMax = function (nums) {
		let index = 0;
		for (let i = 0; i < nums.length; i++) {
			index = nums[i] > nums[index] ? i : index;
		}
		return index;
	};

	this.predict = function (features) {
		const classes = new Array(2);

		if (features[12] <= 1.166660487651825) {
			if (features[19] <= 6.051812648773193) {
				classes[0] = 86;
				classes[1] = 0;
			} else {
				if (features[0] <= 0.051657332107424736) {
					classes[0] = 1;
					classes[1] = 0;
				} else {
					classes[0] = 0;
					classes[1] = 1;
				}
			}
		} else {
			if (features[16] <= 332.41241455078125) {
				if (features[1] <= -4.539099931716919) {
					if (features[15] <= 8.719079971313477) {
						classes[0] = 1;
						classes[1] = 0;
					} else {
						classes[0] = 0;
						classes[1] = 4;
					}
				} else {
					classes[0] = 0;
					classes[1] = 83;
				}
			} else {
				classes[0] = 1;
				classes[1] = 0;
			}
		}

		return findMax(classes);
	};

};

export const clf = new DecisionTreeClassifier();