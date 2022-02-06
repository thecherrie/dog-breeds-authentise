import { useEffect, useState } from 'react';
import FloatingActionButton from './components/floating_action_button/fab';
import './index.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import ListItem from './components/list_item/list_item';
import { AiFillHeart, AiFillDelete } from 'react-icons/ai'
import Btn from './components/button/button';
import Card from './components/card/card';
import Folder from './components/folder/folder';

function App() {

  const [JSONBreeds, setJSONBreeds] = useState([])
  const [filteredBreeds, setFilteredBreeds] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [favouriteBreeds, setFavouriteBreeds] = useState([])
  const [collections, setCollections] = useState([])

  useEffect(() => {
    const url = 'https://dog.ceo/api/breeds/list/all'
    fetch(url)
      .then(data => data.json())
      .then(data => data.message)
      .then(data => Object.keys(data))
      .then(data => setJSONBreeds(data))
  })

  function handleSearch(e) {
    setSearchQuery(e.target.value)
    var filteredBreeds = JSONBreeds.filter(breed => {
      return breed.includes(searchQuery)
    })
    setFilteredBreeds(filteredBreeds.slice(0, 10))
  }

  function collectionDoesNotExist(collectionName) {
    if (collections.includes(collectionName)) return false;
    return true;
  }

  function getAmountOfPics(breedName) {
    const _filtered = favouriteBreeds.filter(breed => {
      return breed.breedName == breedName
    })

    return _filtered.length;
  }

  function removeBreed(breedName) {
    setFavouriteBreeds(favouriteBreeds.filter(breed => {
      return breed !== breedName;
    }))

    setCollections(collections.filter(item => {
      return item !== breedName;
    }))
  }

  async function addFavouriteBreed(breedName) {
    const imageurl = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`)
    const fetchedImage = await imageurl.json();

    console.log(fetchedImage.message)

    const newFavBreed = {
      id: favouriteBreeds.length + 1,
      image: fetchedImage.message,
      breedName,
    }

    setFavouriteBreeds([...favouriteBreeds, newFavBreed])

    if (collectionDoesNotExist(newFavBreed.breedName)) return setCollections([...collections, newFavBreed.breedName])
    else return;
  }

  return (
    <>
      <div className="containerBg">
        <div className="container">
          <h1 style={{ margin: "30px 10px" }}>Favourite Dog Breeds</h1>
          <p>Search, then click the ❤️ to add a breed to your favourites</p>
          {/* {
            JSONBreeds.map(breed => {
              return <p>{breed}</p>
            })
          } */}
          <input placeholder="Search breeds..." onChange={(e) => handleSearch(e)} className="search"></input>
          <div className="suggestions" style={searchQuery.length <= 0 ? { display: "none" } : { display: "grid" }}>
            {filteredBreeds.map((breed, index) => {
              return <ListItem leading={breed} collections={collections}
                addNewFavouriteBreed={(breedName) => addFavouriteBreed(breedName)}
                removeFavouriteBreed={(breedName) => removeBreed(breedName)}
              />
            })
            }
          </div>
          <h2 style={{ margin: 10 }}>Collections</h2>
          <div className="cardContainer">
            {
              collections.map((collection, index) => {
                // return <Card key={favBreed.id} text={favBreed.breedName} image={favBreed.image} />
                return <Folder key={index} text={collection} amtOfItems={getAmountOfPics(collection)} favouriteBreeds={favouriteBreeds}
                  addNewFavouriteBreed={(breedName) => addFavouriteBreed(breedName)}
                  removeFavouriteBreed={(breedName) => removeBreed(breedName)}
                />
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
