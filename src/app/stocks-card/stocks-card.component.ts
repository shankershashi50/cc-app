import { Component, OnInit } from '@angular/core';
import * as ProtoBuf from 'protobufjs';

@Component({
  selector: 'app-stocks-card',
  templateUrl: './stocks-card.component.html',
  styleUrls: ['./stocks-card.component.scss']
})
export class StocksCardComponent implements OnInit {
  public Message: any;
  public connection = new WebSocket("wss://streamer.finance.yahoo.com");
  public stocksSlide: {
    googSlide: boolean,
    msftSlide: boolean,
    tslaSlide: boolean,
    aaplSlide: boolean
  } = {
      googSlide: true,
      msftSlide: true,
      tslaSlide: true,
      aaplSlide: true
    };

  public trackedData: {
    curr_price: Number,
    d_high: Number,
    d_low: Number,
    name: String,
    symbol: String,
    w_52_high: Number,
    w_52_low: Number,
    change: Number
  } = {
      curr_price: 0,
      d_high: 0,
      d_low: 0,
      name: 'N/A',
      symbol: 'N/A',
      w_52_high: 0,
      w_52_low: 0,
      change: 0
    };

  public stockData: {
    goog: any,
    aapl: any,
    tsla: any,
    msft: any
  } = {
      goog: this.trackedData,
      aapl: this.trackedData,
      tsla: this.trackedData,
      msft: this.trackedData
    }
  constructor() {
  }

  ngOnInit(): void {
    this.Message = ProtoBuf.loadProtoFile('../../assets/PricingData.proto', (err, builder) => {
      this.Message = builder.build('PricingData');
      this.loadMessage();
    });
  }

  loadMessage() {
    this.connection.onopen = () => {
      this.connection.send('{"subscribe":["GOOG","AAPL","TSLA","MSFT"]}');
      this.connection.onmessage = (e) => {
        try {
          let msg = this.Message.decode(e.data);
          console.log('Decoded message', msg.id + ' with price: ' + msg.price)
          var trackedData = {
            curr_price: msg.price,
            d_high: msg.dayHigh,
            d_low: msg.dayLow,
            name: msg.id,
            // === 'AAPL' ? 'Apple Inc.' : (msg.id === 'GOOG' ? 'Alphabet Inc.'
            //   : (msg.id === 'TSLA' ? 'Tesla' :
            //     (msg.id === 'MSFT' ? 'Microsoft' : msg.id))),
            symbol: msg.id,
            w_52_high: msg.vol_52weeks.high,
            w_52_low: msg.vol_52weeks.low,
            change: msg.change
          };
          if (trackedData.symbol === 'MSFT') {
            this.stockData.msft = trackedData;
          } else if (trackedData.symbol === 'AAPL') {
            this.stockData.aapl = trackedData;
          } else if (trackedData.symbol === 'TSLA') {
            this.stockData.tsla = trackedData;
          } else {
            this.stockData.goog = trackedData;
          }
          // this.trackedData.push(trackedData);
        } catch (e) {
          console.error('Error parsing :', e)
        }
      }
    }
    this.connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    }
  }

  onSlideSlideChange(event: any, stocks: string) {
    if (stocks === 'GOOG') {
      this.stocksSlide.googSlide = event.checked;
    } else if (stocks === 'TSLA') {
      this.stocksSlide.tslaSlide = event.checked;
    } else if (stocks === 'AAPL') {
      this.stocksSlide.aaplSlide = event.checked;
    } else {
      this.stocksSlide.msftSlide = event.checked;
    }
    if (event.checked) {
      this.connection.send(`{"subscribe":["${stocks}"]}`);
      this.connection.onmessage = (e) => {
        try {
          let msg = this.Message.decode(e.data);
          console.log('Decoded message', msg.id + ' with price: ' + msg.price)
          let trackedData = {
            curr_price: msg.price,
            d_high: msg.dayHigh,
            d_low: msg.dayLow,
            name: msg.id,
            symbol: msg.id,
            w_52_high: msg.vol_52weeks.high,
            w_52_low: msg.vol_52weeks.low,
            change: msg.change
          };
          if (trackedData.symbol === 'MSFT') {
            this.stockData.msft = trackedData;
          } else if (trackedData.symbol === 'AAPL') {
            this.stockData.aapl = trackedData;
          } else if (trackedData.symbol === 'TSLA') {
            this.stockData.tsla = trackedData;
          } else {
            this.stockData.goog = trackedData;
          }
          // this.trackedData.push(trackedData);
        } catch (e) {
          console.error('Error parsing :', e)
        }
      }
    } else {
      this.connection.send(`{"unsubscribe":["${stocks}"]}`);
      this.connection.onmessage = (e) => {
        try {
          let msg = this.Message.decode(e.data);
          console.log('Decoded message', msg.id + ' with price: ' + msg.price)
          var trackedData = {
            curr_price: msg.price,
            d_high: msg.dayHigh,
            d_low: msg.dayLow,
            name: msg.id,
            symbol: msg.id,
            w_52_high: msg.vol_52weeks.high,
            w_52_low: msg.vol_52weeks.low,
            change: msg.change
          };
          if (trackedData.symbol === 'MSFT') {
            this.stockData.msft = trackedData;
          } else if (trackedData.symbol === 'AAPL') {
            this.stockData.aapl = trackedData;
          } else if (trackedData.symbol === 'TSLA') {
            this.stockData.tsla = trackedData;
          } else {
            this.stockData.goog = trackedData;
          }
        } catch (e) {
          console.error('Error parsing :', e)
        }
      }
    }
  }

  public getClass(data: Number, name: string): String {
    if (name === 'GOOG') {
      return this.stocksSlide.googSlide ? (data >= 0 ? 'color-g' : 'color-r') : 'color-gr';
    } else if (name === 'TSLA') {
      return this.stocksSlide.tslaSlide ? (data >= 0 ? 'color-g' : 'color-r') : 'color-gr';
    } else if (name === 'AAPL') {
      return this.stocksSlide.aaplSlide ? (data >= 0 ? 'color-g' : 'color-r') : 'color-gr';
    } else {
      return this.stocksSlide.msftSlide ? (data >= 0 ? 'color-g' : 'color-r') : 'color-gr';
    }
  }

  public getIsMobileResolution(): boolean {
    return window.innerWidth < 768 ? true : false;
  }
}
