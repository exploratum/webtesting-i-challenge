module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  // item.enhancement >= 20? 
  // {...item, enhancement:20} :
  // if(item.enhancement < 20)
  // return {...item, enhancement: item.enhancement + 1}
  // else 
  // return {...item, enhancement:20};

  const newItem = item.enhancement < 20 ?
    {...item, enhancement: item.enhancement + 1} :
    {...item, enhancement:20};

  return newItem;
}

function fail(item) {

  const enhancement = item.enhancement;
  const durability = item.durability

  //Decrement values but can not go lower than 0
  const durabilityMinus10 = (durability >= 10) ? durability-10 : 0;
  const durabilityMinus5 = (durability >=5) ? durability-5 : 0;

  //Decrement durability
  const newDurability = enhancement < 15?
    durabilityMinus5 : durabilityMinus10;

  //Decrement enhancement
  const newEnhancement = enhancement > 16?
    enhancement - 1 : enhancement;

  //return final value
  return {...item, 
      enhancement: newEnhancement,
      durability: newDurability,
    }
}

function repair(item) {
  return { ...item, durability:100 };
}

function get(item) {
  return (
    item.enhancement === 0 ? 
    {...item} : 
    {...item, name: `[+${item.enhancement}] ${item.name}`}
  )
}
