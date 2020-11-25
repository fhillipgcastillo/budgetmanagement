import {
  Button,
  Container,
  Content,
  DatePicker,
  Form,
  Input,
  Item,
  Label,
  Picker,
} from "native-base";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: null};
  }
  onValueChange = (value)=>{
    this.setState({selected: value});
  };
  save = () =>{
    
  };
  render() {
    return (
      <Container>
        <Content padder>
          <Form style={{display: "flex", flex: 1}}>
            <Item inlineLabel>
              <Label>Date: </Label>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(2000, 1, 1)}
                maximumDate={new Date(2100, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            <Item inlineLabel>
              <Label>Codigo: </Label>
              <Input disabled value={"SOMECODE"} />
            </Item>
            <Item>
              <Label>Account (dropdown): </Label>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.selected}
              >
                <Picker.Item label="Activos" value="key0" />
                <Picker.Item label="Padivo" value="key1" />
                <Picker.Item label="Capital" value="key2" />
                <Picker.Item label="Costos" value="key3" />
                <Picker.Item label="Gastos" value="key4" />
              </Picker>
            </Item>
            <Item>
              <Label>Description: </Label>
              <Input />
            </Item>
            <Item>
              <Label>Debe: </Label>
              <Input />
            </Item>
            <Item>
              <Label>Haber: </Label>
              <Input />
            </Item>
            
          </Form>
          <View style={{alignSelf:"flex-end", display:"flex", flex: 1, justifyContent: "space-around", flexDirection: "row"}}>
              <Button danger style={{ width: 200, padding: 10}}><Text>Cancel</Text></Button>
              <Button success style={{ width: 200, padding: 10}}><Text>Save</Text></Button>
            </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {
    states: {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {},
  };
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);
