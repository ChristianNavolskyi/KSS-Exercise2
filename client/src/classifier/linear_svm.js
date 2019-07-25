let SVC = function (nClasses, nRows, vectors, coefficients, intercepts, weights, kernel, gamma, coef0, degree) {

	this.nClasses = nClasses;
	this.classes = new Array(nClasses);
	for (let i = 0; i < nClasses; i++) {
		this.classes[i] = i;
	}
	this.nRows = nRows;
	this.vectors = vectors;
	this.coefficients = coefficients;
	this.intercepts = intercepts;
	this.weights = weights;
	this.kernel = kernel.toUpperCase();
	this.gamma = gamma;
	this.coef0 = coef0;
	this.degree = degree;

	this.predict = function (features) {

		let kernels = new Array(vectors.length);
		let kernel;
		switch (this.kernel) {
			case 'LINEAR':
				// <x,x'>
				for (let i = 0; i < this.vectors.length; i++) {
					kernel = 0.;
					for (let j = 0; j < this.vectors[i].length; j++) {
						kernel += this.vectors[i][j] * features[j];
					}
					kernels[i] = kernel;
				}
				break;
			case 'POLY':
				// (y<x,x'>+r)^d
				for (let i = 0; i < this.vectors.length; i++) {
					kernel = 0.;
					for (let j = 0; j < this.vectors[i].length; j++) {
						kernel += this.vectors[i][j] * features[j];
					}
					kernels[i] = Math.pow((this.gamma * kernel) + this.coef0, this.degree);
				}
				break;
			case 'RBF':
				// exp(-y|x-x'|^2)
				for (let i = 0; i < this.vectors.length; i++) {
					kernel = 0.;
					for (let j = 0; j < this.vectors[i].length; j++) {
						kernel += Math.pow(this.vectors[i][j] - features[j], 2);
					}
					kernels[i] = Math.exp(-this.gamma * kernel);
				}
				break;
			case 'SIGMOID':
				// tanh(y<x,x'>+r)
				for (let i = 0; i < this.vectors.length; i++) {
					kernel = 0.;
					for (let j = 0; j < this.vectors[i].length; j++) {
						kernel += this.vectors[i][j] * features[j];
					}
					kernels[i] = Math.tanh((this.gamma * kernel) + this.coef0);
				}
				break;
		}

		let starts = new Array(this.nRows);
		for (let i = 0; i < this.nRows; i++) {
			if (i !== 0) {
				let start = 0;
				for (let j = 0; j < i; j++) {
					start += this.weights[j];
				}
				starts[i] = start;
			} else {
				starts[0] = 0;
			}
		}

		let ends = new Array(this.nRows);
		for (let i = 0; i < this.nRows; i++) {
			ends[i] = this.weights[i] + starts[i];
		}

		if (this.nClasses === 2) {

			for (let i = 0; i < kernels.length; i++) {
				kernels[i] = -kernels[i];
			}

			let decision = 0.;
			for (let k = starts[1]; k < ends[1]; k++) {
				decision += kernels[k] * this.coefficients[0][k];
			}
			for (let k = starts[0]; k < ends[0]; k++) {
				decision += kernels[k] * this.coefficients[0][k];
			}
			decision += this.intercepts[0];

			if (decision > 0) {
				return 0;
			}
			return 1;

		}

		let decisions = new Array(this.intercepts.length);
		for (let i = 0, d = 0, l = this.nRows; i < l; i++) {
			for (let j = i + 1; j < l; j++) {
				let tmp = 0.;
				for (let k = starts[j]; k < ends[j]; k++) {
					tmp += this.coefficients[i][k] * kernels[k];
				}
				for (let k = starts[i]; k < ends[i]; k++) {
					tmp += this.coefficients[j - 1][k] * kernels[k];
				}
				decisions[d] = tmp + this.intercepts[d];
				d++;
			}
		}

		let votes = new Array(this.intercepts.length);
		for (let i = 0, d = 0, l = this.nRows; i < l; i++) {
			for (let j = i + 1; j < l; j++) {
				votes[d] = decisions[d] > 0 ? i : j;
				d++;
			}
		}

		let amounts = new Array(this.nClasses).fill(0);
		for (let i = 0, l = votes.length; i < l; i++) {
			amounts[votes[i]] += 1;
		}

		let classVal = -1, classIdx = -1;
		for (let i = 0, l = amounts.length; i < l; i++) {
			if (amounts[i] > classVal) {
				classVal = amounts[i];
				classIdx = i;
			}
		}
		return this.classes[classIdx];

	}

};

// Parameters:
let vectors = [[-0.007873727439561348, -3.112337589263916, 2.3847274780273438, 0.6665118790881598, -0.012707900322204807, -2.3895671367645264, 2.6831517219543457, 0.6749622656652713, -0.017264562993711423, -3.565636157989502, 3.375925064086914, 0.8701950919257571, 1.6516762135629373, 0.0011775162038816234, 18.8149889433937, 2.8829119025558603, 323.45366972165147, 80.42449544841264, 22.33540420588408, 6.732037564810911, 9.233066770033187, 5.880048920042648], [-0.11998226028857845, -1.2258950471878052, 1.0259838104248047, 0.4198444404852513, -0.038578878239829945, -0.9753867387771606, 0.5398632884025574, 0.29841304421839104, -0.04718552957666983, -1.3556547164916992, 2.0972461700439453, 0.7159734010389662, 0.7883458044171402, 0.012406024609532551, 6.0635458293380715, 0.8829985814173952, 3.019861353454108, 0.7841825935430633, 6.669842905451219, 1.761150490027849, 8.617249919549355, 1.871750222516419], [-0.012503036587829992, -1.0055310726165771, 1.050668478012085, 0.3557954748707498, -0.0017667771368236331, -0.5816664695739746, 0.4314461350440979, 0.19349947986219687, -0.026915565951839908, -1.9847502708435059, 2.2553577423095703, 0.6009080072103509, 0.5240832697781047, 0.0035334092683854124, 5.241055640131089, 0.7312532345429432, 137.909787314242, 170.35199933919031, 5.614073221978523, 2.7762016298997025, 0.8676839766871428, 3.0355347992675275], [0.006491914865645495, -1.8834296464920044, 1.724614143371582, 0.5440759313711768, -0.01732935992154208, -2.5743916034698486, 1.431272029876709, 0.44534394735618, -0.0233119045604359, -2.429105758666992, 1.9315109252929688, 0.5973383198350906, 0.8489536775688891, 0.0037395903992774038, 12.992115516755632, 1.5123074838869452, 345.9797072047634, 8.238392468778695, 9.982380258881303, 1.5777272169466257, 3.9556450032655897, 2.8458747740440624], [0.01851424877117537, -1.3237378597259521, 1.0302834510803223, 0.35722042931687065, -0.025975870067962974, -1.0910320281982422, 1.0535376071929932, 0.3778394714868457, -0.035468213498804496, -2.2826356887817383, 4.0570478439331055, 0.8623312257836862, 1.01265127684338, 0.008992800730457162, 16.490247976872215, 1.9297624910657225, 147.6844220644679, 165.1507013335929, 13.153031453439965, 1.316967652874472, 1.8714490608324492, 4.058880896579364], [-0.11797394036854568, -1.5705386400222778, 1.2231791019439697, 0.5895272810354576, -0.2487600521037453, -2.1376893520355225, 1.2706105709075928, 0.6555679640492805, -0.047962299146150286, -1.8121976852416992, 2.0725021362304688, 0.6880830800178849, 1.324481224845766, 0.029392634934566786, 6.764630475826621, 1.1650338791086094, 189.7012081151391, 26.088609464486257, 5.988295950212413, 1.9493544448913736, 3.26420335029651, 3.086046944947781], [0.11197948295583007, -1.6549633741378784, 1.9428446292877197, 0.6819234453736567, -0.0828551446024235, -2.0599355697631836, 1.1539819240570068, 0.6532329397362755, -0.03139912697576707, -2.846403121948242, 4.332529067993164, 0.9341158736687404, 1.7783719341140136, 0.015544056532036166, 22.16750458821606, 2.422092262276357, 235.97336203215988, 29.166131387436106, 6.069831510060073, 1.1584086694568818, 4.15601938542167, 1.5239921827513505], [0.04187658506037926, -1.6290761232376099, 1.490195631980896, 0.5541104209264489, -0.34148239028835636, -2.241102695465088, 1.234837532043457, 0.633289263431048, 0.08097930989655736, -1.7921218872070312, 2.6345109939575195, 0.6899398098675081, 1.3048181941870924, 0.006403970138538606, 10.2453049103881, 1.716280280983124, 163.72829711431044, 135.16485315362002, 11.672448207986525, 1.702125425548826, -0.39683412105627114, 1.1480595231686916], [0.21587627677507298, -1.4755057096481323, 2.1906771659851074, 0.5828008399986614, -0.16949914048649503, -1.9362530708312988, 1.5849335193634033, 0.719589081398505, 0.04227457935237543, -2.0811257362365723, 3.443279266357422, 0.9372523840175727, 1.806805072125384, 0.012508447769562281, 15.689954780485849, 1.8719209526682226, 167.91330010597665, 35.56786592570947, 12.411921141366081, 1.8129120012210451, 4.046017610735147, 3.987258531691882], [0.13384528774203677, -0.6864964962005615, 2.0570921897888184, 0.5902753973460214, -0.02767667445269498, -1.477250576019287, 0.9015169143676758, 0.5717203823422633, 0.1763226335698908, -4.013756275177002, 2.953803062438965, 1.404040008461208, 2.6562875496765135, 0.012814869564977016, 16.719017175909244, 3.1952575623181216, 240.05552938520972, 167.88452408856148, 21.94473684598338, 4.683478096806075, 14.360222825991395, 6.437054826251108]];
let coefficients = [[-0.20075575131644238, -0.4118711804895765, -0.2726595928335631, -0.5753221914207823, -0.39122269723900077, 0.7945360744276085, 0.1670927043746664, 0.34059077458543946, 0.2391192495229796, 0.31049261038865833]];
let intercepts = [2.265346834809518];
let weights = [5, 5];

// Prediction:
export const svm = new SVC(2, 2, vectors, coefficients, intercepts, weights, "linear", 0.0, 0.0, 3);