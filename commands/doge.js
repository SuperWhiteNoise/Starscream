const fetch = require('node-fetch');
const config = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'doge',
	description: 'doge',
	execute(message) {
		fetch(config.apiUrl + 'coins/dogecoin')
			.then(Response => Response.json())
			.then(data => {
				console.log(data.id + ` information retrieved for ${message.author.username}`);
				const crypto = data.id;
				const thumb = data.image.thumb;
				const currentPrice = data.market_data.current_price.gbp;
				const high24 = data.market_data.high_24h.gbp;
				const low24 = data.market_data.low_24h.gbp;
				const priceChange24h = data.market_data.price_change_percentage_24h;
				//				const priceChange7d = data.market_data.price_change_percentage_7d;
				//				const priceChange14d = data.market_data.price_change_percentage_14d;
				//				const priceChange30d = data.market_data.price_change_percentage_30d;
				//				const priceChange1y = data.market_data.price_change_percentage_1y;
				//				const priceChange24hGBP = data.market_data.price_change_24h_in_currency.gbp;
				const coinMessage = new Discord.MessageEmbed()
					.setTitle(crypto)
					.setThumbnail(thumb)
					.setColor('#f5c105')
					.setDescription(`---All figures in GBP---\n\nCurrent price: ${currentPrice}\n24h High: ${high24} / 24h Low: ${low24}\nPrice Change % in last 24h: ${priceChange24h}`)
				message.channel.send(coinMessage);
			})
		}
	}