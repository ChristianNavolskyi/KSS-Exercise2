const RandomForestClassifier = function () {

	const findMax = function (nums) {
		let index = 0;
		for (let i = 0; i < nums.length; i++) {
			index = nums[i] > nums[index] ? i : index;
		}
		return index;
	};

	const trees = [];

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[6] <= 0.8930649161338806) {
			if (features[19] <= 5.131216526031494) {
				classes[0] = 74;
				classes[1] = 0;
			} else {
				if (features[15] <= 1.8698216676712036) {
					classes[0] = 1;
					classes[1] = 0;
				} else {
					classes[0] = 0;
					classes[1] = 3;
				}
			}
		} else {
			if (features[17] <= 3.1161038875579834) {
				classes[0] = 14;
				classes[1] = 0;
			} else {
				if (features[12] <= 1.1293385028839111) {
					if (features[12] <= 0.8762240707874298) {
						classes[0] = 0;
						classes[1] = 2;
					} else {
						classes[0] = 2;
						classes[1] = 0;
					}
				} else {
					if (features[8] <= 0.2231920212507248) {
						if (features[16] <= 319.40858459472656) {
							classes[0] = 0;
							classes[1] = 73;
						} else {
							classes[0] = 1;
							classes[1] = 0;
						}
					} else {
						if (features[1] <= -4.4758336544036865) {
							classes[0] = 1;
							classes[1] = 0;
						} else {
							classes[0] = 0;
							classes[1] = 6;
						}
					}
				}
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[3] <= 0.48470519483089447) {
			if (features[7] <= 0.3514365702867508) {
				classes[0] = 78;
				classes[1] = 0;
			} else {
				if (features[10] <= 1.3840522766113281) {
					classes[0] = 0;
					classes[1] = 4;
				} else {
					classes[0] = 3;
					classes[1] = 0;
				}
			}
		} else {
			if (features[12] <= 1.174329161643982) {
				classes[0] = 8;
				classes[1] = 0;
			} else {
				if (features[18] <= 20.18013858795166) {
					classes[0] = 0;
					classes[1] = 68;
				} else {
					if (features[11] <= 1.079724133014679) {
						if (features[16] <= 273.5177536010742) {
							classes[0] = 0;
							classes[1] = 2;
						} else {
							classes[0] = 2;
							classes[1] = 0;
						}
					} else {
						classes[0] = 0;
						classes[1] = 12;
					}
				}
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[7] <= 0.5576537251472473) {
			if (features[4] <= -0.07421695068478584) {
				if (features[13] <= 0.006262958922889084) {
					classes[0] = 0;
					classes[1] = 2;
				} else {
					classes[0] = 2;
					classes[1] = 0;
				}
			} else {
				classes[0] = 80;
				classes[1] = 0;
			}
		} else {
			if (features[14] <= 55.51546859741211) {
				if (features[16] <= 327.2328796386719) {
					classes[0] = 0;
					classes[1] = 88;
				} else {
					classes[0] = 1;
					classes[1] = 0;
				}
			} else {
				if (features[6] <= 1.9548519253730774) {
					classes[0] = 1;
					classes[1] = 0;
				} else {
					classes[0] = 0;
					classes[1] = 3;
				}
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[14] <= 6.61716103553772) {
			if (features[11] <= 0.6186195611953735) {
				classes[0] = 58;
				classes[1] = 0;
			} else {
				if (features[10] <= 1.618924856185913) {
					classes[0] = 0;
					classes[1] = 6;
				} else {
					if (features[5] <= -1.7558462023735046) {
						classes[0] = 0;
						classes[1] = 2;
					} else {
						classes[0] = 6;
						classes[1] = 0;
					}
				}
			}
		} else {
			if (features[11] <= 0.682612270116806) {
				classes[0] = 13;
				classes[1] = 0;
			} else {
				if (features[20] <= 9.265974998474121) {
					classes[0] = 0;
					classes[1] = 88;
				} else {
					if (features[4] <= -0.08396618813276291) {
						classes[0] = 0;
						classes[1] = 3;
					} else {
						classes[0] = 1;
						classes[1] = 0;
					}
				}
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[7] <= 0.5425627529621124) {
			if (features[11] <= 1.1868024170398712) {
				classes[0] = 94;
				classes[1] = 0;
			} else {
				classes[0] = 0;
				classes[1] = 2;
			}
		} else {
			if (features[15] <= 7.2010931968688965) {
				classes[0] = 0;
				classes[1] = 67;
			} else {
				if (features[20] <= 7.86083459854126) {
					classes[0] = 0;
					classes[1] = 12;
				} else {
					classes[0] = 2;
					classes[1] = 0;
				}
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[5] <= -1.204160749912262) {
			if (features[14] <= 19.49738883972168) {
				if (features[16] <= 319.40858459472656) {
					if (features[11] <= 0.7175103724002838) {
						if (features[5] <= -1.496884822845459) {
							classes[0] = 2;
							classes[1] = 0;
						} else {
							classes[0] = 0;
							classes[1] = 1;
						}
					} else {
						classes[0] = 0;
						classes[1] = 29;
					}
				} else {
					classes[0] = 6;
					classes[1] = 0;
				}
			} else {
				classes[0] = 0;
				classes[1] = 52;
			}
		} else {
			if (features[2] <= 1.46153324842453) {
				classes[0] = 81;
				classes[1] = 0;
			} else {
				if (features[11] <= 0.7127225399017334) {
					classes[0] = 4;
					classes[1] = 0;
				} else {
					classes[0] = 0;
					classes[1] = 2;
				}
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[11] <= 0.7175103724002838) {
			if (features[0] <= -0.27810728549957275) {
				classes[0] = 0;
				classes[1] = 2;
			} else {
				if (features[3] <= 0.5830777585506439) {
					classes[0] = 85;
					classes[1] = 0;
				} else {
					if (features[16] <= 282.76812744140625) {
						classes[0] = 0;
						classes[1] = 1;
					} else {
						classes[0] = 5;
						classes[1] = 0;
					}
				}
			}
		} else {
			if (features[16] <= 332.41241455078125) {
				classes[0] = 0;
				classes[1] = 81;
			} else {
				classes[0] = 3;
				classes[1] = 0;
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[5] <= -1.202587366104126) {
			if (features[12] <= 1.2024155259132385) {
				classes[0] = 4;
				classes[1] = 0;
			} else {
				if (features[10] <= 6.6260986328125) {
					classes[0] = 0;
					classes[1] = 68;
				} else {
					if (features[7] <= 0.7967989146709442) {
						classes[0] = 2;
						classes[1] = 0;
					} else {
						classes[0] = 0;
						classes[1] = 9;
					}
				}
			}
		} else {
			if (features[13] <= 0.08441515313461423) {
				if (features[19] <= 5.535621166229248) {
					classes[0] = 90;
					classes[1] = 0;
				} else {
					classes[0] = 0;
					classes[1] = 1;
				}
			} else {
				classes[0] = 0;
				classes[1] = 3;
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[11] <= 0.7010846734046936) {
			if (features[13] <= 0.03236550884321332) {
				classes[0] = 93;
				classes[1] = 0;
			} else {
				classes[0] = 0;
				classes[1] = 1;
			}
		} else {
			if (features[16] <= 332.41241455078125) {
				if (features[6] <= 0.7491312026977539) {
					if (features[12] <= 1.645639181137085) {
						classes[0] = 1;
						classes[1] = 0;
					} else {
						classes[0] = 0;
						classes[1] = 1;
					}
				} else {
					classes[0] = 0;
					classes[1] = 78;
				}
			} else {
				classes[0] = 3;
				classes[1] = 0;
			}
		}

		return findMax(classes);
	});

	trees.push(function (features) {
		const classes = new Array(2);

		if (features[11] <= 0.7237035632133484) {
			if (features[4] <= -0.21295077726244926) {
				classes[0] = 0;
				classes[1] = 2;
			} else {
				if (features[13] <= 0.026365933939814568) {
					classes[0] = 96;
					classes[1] = 0;
				} else {
					classes[0] = 0;
					classes[1] = 1;
				}
			}
		} else {
			if (features[13] <= 0.024541309103369713) {
				if (features[6] <= 1.7114956378936768) {
					classes[0] = 0;
					classes[1] = 11;
				} else {
					classes[0] = 3;
					classes[1] = 0;
				}
			} else {
				classes[0] = 0;
				classes[1] = 64;
			}
		}

		return findMax(classes);
	});

	this.predict = function (features) {
		const classes = new Array(2).fill(0);
		for (let i = 0; i < trees.length; i++) {
			classes[trees[i](features)]++;
		}
		return findMax(classes);
	}

};

export const prediction = (features) => new RandomForestClassifier().predict(features);