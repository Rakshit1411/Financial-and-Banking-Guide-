import { Button, ScrollView, View, StyleSheet, Text } from 'react-native'
import React, { Component } from 'react'
import { Icon, Container, Header, Content } from 'native-base'
import Headbar from './Components/Headbar';
import { Card, Title, Paragraph } from 'react-native-paper';
import FusionCharts from "react-native-fusioncharts";
import { chartData } from './Components/chart_components/DATA'
import { chartData1 } from './Components/chart_components/DATA1'
import { chartData2 } from './Components/chart_components/DATA2'
import LineChart from './charts/LineChart'
import Column2dChart from './charts/Column2dChart'
import PieChart from './charts/PieChart'
import DataTables from './Components/DataTables'
import CustomList from './Components/CustomList';
import axios from 'axios';
// Preparing the chart data

// Create a JSON object to store the chart configurations

class DashboardScreen extends Component
{
	constructor(props) {
		super(props);
		this.state = {
				modalVisible: false
			};
	}
	setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
		console.log(visible);
  };
	loadModal=(name)=>{

		console.log(name);

	}
	sendSms(){
		console.log('sending sms');
		var SmsAndroid = require('react-native-android-sms');
		var text = "Hello ... This is test message from Rakshit Sharma, Please ignore !!!!!";
		var addressList = {
				addressList: [
						"7014477935"
				]
		}

		SmsAndroid.send(JSON.stringify(addressList), text, (fail) => {
				console.log("OH Snap: " + fail)
		},
		(status) => {
				console.log('Status: ', status);
		});
	}

	listSms(){
		/* List SMS messages matching the filter */
		var SmsAndroid = require('react-native-android-sms');
		var filter = {
		box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

		/**
		 *  the next 3 filters can work together, they are AND-ed
		 *
		 *  minDate, maxDate filters work like this:
		 *    - If and only if you set a maxDate, it's like executing this SQL query:
		 *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
		 *    - Same for minDate but with "date >= minDate"
		 */
		bodyRegex: '(?i)((.*)debited(.*)Acc(.*))|((.*)credited(.*)Acc(.*))|((.*)Acc(.*)debited(.*))|((.*)Acc(.*)credited(.*))|((.*)a/c(.*)debited(.*))|((.*)a/c(.*)credited(.*))|((.*)credited(.*)a/c(.*))|((.*)debited(.*)a/c(.*))', // content regex to match

		/** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
		//read: 0, // 0 for unread SMS, 1 for SMS already read
		// _id: 1234, // specify the msg id
		// thread_id: 12 // specify the conversation thread_id
		// address: '+1888------', // sender's phone number
		// body: 'How are you', // content to match
		/** the next 2 filters can be used for pagination **/
		indexFrom: 0, // start from index 0
		//maxCount: 10, // count of SMS to return each time
		};
		var url = "http://192.168.1.54:8080/sms/analyse";
		var data = {};
		SmsAndroid.list(
		JSON.stringify(filter),
		(fail) => {
		  console.log('Failed with this error: ' + fail);
		},
		(count, smsList) => {
		  // console.log('Count: ', count);
		  // console.log('List: ', smsList);
		  // var arr = JSON.parse(smsList);
			//
		  // arr.forEach(function(object) {
		  //   console.log('Object: ' + object);
		  //   console.log('-->' + object.date);
		  //   console.log('-->' + object.body);
		  // });
			axios.post(url, {'data':smsList,'phoneNo':'9888138824'})
		        .then(response => {
							console.log('here'+response);
		            if (response.data.status) {
		                console.log(response);
		                send_response = response;
		            }
		        })
		       	.catch(error => {
		            console.log(error);
		        });
		},
		);
	}

	render(){
		this.listSms();
    const navigate = this.props.navigation;
    const title='Dashboard';
		this.visible=true;
		const recurring_transactions = [
		  {
		    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		    title: "Vodafone Mobile",
				category: "Mobile Payments",
				last_payment_date: "2020-02-18",
				amount:"Rs 450.00"
		  },
			{
		    id: "bd7acbea-c1b1-4622-aed5-3ad53abb28ba",
		    title: "Apple Music",
				category: "Music Subscriptions",
				last_payment_date: "2020-02-03",
				amount:"Rs 99.00"
		  },
			{
				id: "bd7acbea-c1b1-46c2-ae9d5-3ad53abb28ba",
				title: "Spotify",
				category: "Music Subscriptions",
				last_payment_date: "2020-02-07",
				amount:"Rs 79.00"
			},
		];
		return (
      <Container style={{backgroundColor:'#0A1045'}}>
      <Headbar navigation={ navigate } title={ title } sendSms={this.listSms} />
      <ScrollView>
      <ScrollView horizontal={true}>
      <Card style={{...styles.card,margin:5,backgroundColor: '#40a8c4',padding:5}}>
      <Card.Content>
        <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Account Balance</Paragraph>
        <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Rs. 30000</Title>
      </Card.Content>
      </Card>
			<Card style={{...styles.card,margin:5,backgroundColor: '#e94560',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Cash in my pocket</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Rs. 4000</Title>
        </Card.Content>
      </Card>
      <Card style={{...styles.card,margin:5,backgroundColor: '#206a5d',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>My Budget Status</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Good</Title>
        </Card.Content>
      </Card>
      <Card style={{...styles.card,margin:5,backgroundColor: '#be5683',padding:5}}>

        <Card.Content>
          <Paragraph style={{color:'white',marginTop:-8,textAlign:'center'}}>Savings Last Month</Paragraph>
          <Title style={{color:'white',fontSize:30,textAlign:'center',marginTop:8}}>Rs. 10000</Title>
        </Card.Content>
      </Card>
      </ScrollView>
      <Card
        style={{...styles.card,backgroundColor: 'white'}}
      >
      <LineChart
            width='100%'
            height='350'
            xAxisName='Date'
            dataFormat='json'
            yAxisName='Amount (in rupees)'
            numberPrefix='Rs.'
            theme='fusion'
            caption='Daily Transactions'
            subCaption='Date vs Amount spent'
            data={chartData}
          />
						<Text style={{marginLeft: "auto",padding:10,color:'grey'}} onPress={()=>{this.lineTable.setModalVisible(!this.state.modalVisible)}}>Show Raw Data</Text>
						<DataTables data={chartData} headersForTable={['Country','Amount']} keysForTable={['label','value']} visible={this.state.modalVisible} ref={ref => (this.lineTable = ref)}/>

			</Card>
      <Card
        style={{...styles.card,backgroundColor: 'white'}}
      >
      <Column2dChart
            width='100%'
            height='350'
            xAxisName='Transaction Mode'
            dataFormat='json'
            yAxisName='Amount'
            caption='Transactions Mode'
            subCaption='Transactions Mode vs amount'
            theme='fusion'
            data={chartData2}
          />
						<Text style={{marginLeft: "auto",padding:10,color:'grey'}} onPress={()=>{this.columnTable.setModalVisible(!this.state.modalVisible)}}>Show Raw Data</Text>
						<DataTables data={chartData2} headersForTable={['Transaction Mode','Amount']} keysForTable={['label','value']} visible={this.state.modalVisible} ref={ref => (this.columnTable = ref)}/>
          </Card>
      <Card
        style={{...styles.card,backgroundColor: 'white'}}
      >
      <PieChart width='100%'
			height='350'
			plottooltext='<b>$percentValue</b> of your total spendings were for $label'
			dataFormat='json'
			showlegend='0'
			showpercentvalues='1'
			theme='fusion'
			caption='Transactions By Category'
			legendposition='Bottom'
			usedataplotcolorforlabels='1'
			data={chartData1}/>
						<Text style={{marginLeft: "auto",padding:10,color:'grey'}} onPress={()=>{this.pieTable.setModalVisible(!this.state.modalVisible)}}>Show Raw Data</Text>
						<DataTables data={chartData1} headersForTable={['details','Category','Amount']} keysForTable={['details','label','value']} visible={this.state.modalVisible} ref={ref => (this.pieTable = ref)}/>

			</Card>

			<Card
				style={{...styles.card,backgroundColor: 'white'}}
			>
			<Text style={styles.cardTitle}>Recurring Transactions</Text>
			<CustomList data={recurring_transactions}/>
			</Card>

			</ScrollView>
      </Container>

		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
  },
  card: {
    shadowColor: '#000',
    margin: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
		borderRadius: 10,
    elevation: 2,backgroundColor: '#f8edeb'
  },
	cardTitle: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
		fontSize:22,
		color: 'black'
  },
});
export default DashboardScreen;
