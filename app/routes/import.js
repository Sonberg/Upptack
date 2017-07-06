import React, {Component} from 'react';
import Base from '../styles/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    Image,
    CameraRoll,
    TouchableHighlight,
    NativeModules,
} from 'react-native';
import _ from 'lodash';

class Import extends Component {
  
    constructor(props) {
      super(props)
      this.state = {
          images: [],
          selected: '',
          isCameraLoaded: false,
          next: null,
          loading: false
      };
    } 
  
    componentWillMount() {
      const fetchParams = {
          first: 24,
          assetType: 'Photos'
      };
    
      this.load(fetchParams);
        
    }


    select(image) {
      this.setState({
          selected: (image !== this.state.selected) ? image : null
      });
        /*
  NativeModules.ReadImageData.readImage(uri, (image) => {
          
        });  */


    }
    
    load(fetchParams) {
      if (!this.state.loading) {
        this.setState({loading: true})
        
        CameraRoll.getPhotos(fetchParams) //Use promises instead of callbacks
        .then((data) => {
          const assets = data.edges;
          const images = assets.map( asset => asset.node.image );
          this.setState({
            isCameraLoaded: true,
            images: this.state.images.concat(images),
            next: data.page_info.has_next_page ? data.page_info.end_cursor : null,
            loading: false
          });
        })
        .catch(err => this.setState({err: err}));
      }
    }
    
    scrollEnd() {
      if (this.state.next) {
        const fetchParams = {
            first: 32,
            assetType: 'Photos',
            after: this.state.next
        };
      
        this.load(fetchParams);
      }
    }
    
    submit() {
      if (this.state.selected) {
        this.props.navigation.state.params.change(this.state.selected);
        this.props.navigation.goBack();
      }
    }
    
    render() {
      
      if (!this.state.isCameraLoaded) {
        return (
          <View style={[Base.body, Base.center]}>
            <Text style={{color: '#bbb', fontFamily: 'System', fontWeight: '500', fontSize: 18, textAlign: 'center'}} >Loading ...</Text>
          </View>
          );
      }
      
      const images = _.map(this.state.images, (image, id) => {
        return (
          <View key={id}>
            <TouchableHighlight underlayColor="#999" style={(this.state.selected === image) ? styles.selected : styles.link} onPress={() => { this.select(image) }}>
              <Image source={{uri: image.uri}} style={[styles.image, (this.state.selected === image) ? styles.selected : null]}></Image>
            </TouchableHighlight>
          </View>
        );
      });
      
        return (
            <View style={Base.body}>
              
              <View style={[Base.bar]}>
                <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                  <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={() => this.props.navigation.goBack()} >
                    <Icon name="chevron-left" size={20} color="#999" style={{backgroundColor: 'transparent'}}></Icon>
                  </TouchableHighlight>
                  
                  <Text style={Base.header}>{this.props.navigation.state.params.title ? this.props.navigation.state.params.title: 'Välj bild'}</Text>
                  
                  <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={() => this.submit()}>
                    <Icon name="check" size={20} color={this.state.selected ? '#157EFB' : '#999'} style={{backgroundColor: 'transparent'}}></Icon>
                  </TouchableHighlight>
                  
                </View>
                <View style={Base.seperator}></View>
              </View>
              
              <ScrollView onMomentumScrollEnd={this.scrollEnd.bind(this)}>
                                
                  <View style={styles.imageGrid}>{images}</View>
                  
                  <View style={[Base.center, { marginVertical: 28, alignItems: 'stretch'}]}>           
                    <Text style={{color: '#bbb', fontFamily: 'System', fontWeight: '500', fontSize: 18, textAlign: 'center'}}>
                      {this.state.next ? ('Hämtar fler bilder...') : ('Slut på bilder') }
                    </Text>
                  </View>
              </ScrollView>
            </View>
        );
    }


    
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingBottom: 4
    },
    imageGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    image: {
        width: (Dimensions.get('window').width /  3) - 8,
        height: (Dimensions.get('window').width /  3) - 8,
    },
    link: {
      margin: 4,
    },
    selected: {
      padding: 4,
      borderRadius: 8,
      backgroundColor: '#157EFB'
    }
});


Import.navigationOptions = {
  //tabBarIcon: ((tintColor) => (<Image style={styles.tabImage} source={require('../images/phone.jpg')}/>)),
  header: null
};

export default Import