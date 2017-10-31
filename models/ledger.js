module.exports = function(sequelize, DataTypes){
	var Ledger = sequelize.define('ledger', {
		paymentNumber: {
			type: DataTypes.FLOAT,
			validate: {
				len[1, 11]
			}
		},
		principal: {
			type: DataTypes.FLOAT,
			validate: {
				len[1, 11]
			}
		}
		interest:  {
			type: DataTypes.FLOAT,
			validate: {
				len[1, 11]
			}
		},
		monthlyPayment: {
			type: DataTypes.FLOAT,
			validate: {
				len[1, 11]
			}
		},
		additionalPayment: {
			type: DataTypes.FLOAT,
			validate: {
				len[1, 11]
			},
			defaultValue: 0
		}
	});

	return Ledger;
};