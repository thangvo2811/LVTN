import React, { useRef, useState, useEffect } from "react";
import Helmet from "../../components/Helmet";

import Checkbox from "../../components/Checkbox";
import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import PriceSlider from "../../components/PriceSlider";
import Button from "../../components/Button";

import asus from "../../assets/images/banner/asus.jpg";

import axios from "axios";
import { useParams } from "react-router-dom";

const FindCategory = () => {
  const filterToggleRef = useRef(null);
  const param = useParams();
  // const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: "",
    unitprice: 0,
    category: [],
  });

  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

  const callAllProduct = async () => {
    await axios
      .get(`http://localhost:8000/api/find-by-Category/${param.category_id}`)
      .then((res) => {
        setAllProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllCategory = async () => {
    await axios
      .get("http://localhost:8000/api/get-Category/")
      .then((res) => {
        setAllCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllBrand = async () => {
    await axios
      .get("http://localhost:8000/api/get-brand/")
      .then((res) => {
        setAllBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllProduct();
    callAllCategory();
    callAllBrand();
  }, [param.category_id]);

  // const handleFilterProduct = useCallback(() => {
  //   let temp = callAllProduct();

  //   if (filters.brand_id !== "") {
  //     temp = temp.filter(
  //       (product) =>
  //         product.brand_id.toString().indexOf(filters.brand_id.toString()) !==
  //         -1
  //     );
  //   }
  //   if (filters.category_id.length > 0) {
  //     temp = temp.filter((product) =>
  //       filters.category_id.includes(product.category_id)
  //     );
  //   }
  //   if (filters.unitprice > 0) {
  //     temp = temp.filter((product) => product.unitprice > filters.unitprice);
  //   }

  //   setAllProduct(temp);
  // }, [filters]);

  // useEffect(() => {
  //   handleFilterProduct();
  // }, [handleFilterProduct]);

  // const toggleFilterHandler = () => {
  //   return filterToggleRef.current.classList.toggle("active");
  // };

  // const checkboxHandler = (checked, item) => {
  //   if (checked) {
  //     setFilters({
  //       ...filters,
  //       allCategory: [...filters.allCategory, item.category_id],
  //     });
  //   } else {
  //     // vì bỏ CHECKED nên lọc ra những thằng KHÁC thằng ĐÃ CHECK này
  //     const newCat = filters.allCategory.filter(
  //       (cat) => cat !== item.category_id
  //     );
  //     setFilters({ ...filters, allCategory: newCat });
  //   }
  // };

  return (
    <Helmet name="Danh mục">
      <div className="category-banner">
        <img src={asus} alt="" />
      </div>
      <div className="category-title">sản phẩm tìm kiếm</div>
      <div className="category">
        <div className="category__filters" ref={filterToggleRef}>
          <div
            className="category__filters__close"
            /* onClick={toggleFilterHandler} */
          >
            <i className="bx bx-chevrons-left"></i>
          </div>

          <div className="category__filters__item">
            <div className="category__filters__item__title">thương hiệu</div>
            <select
              className="category__filters__item__select"
              // onChange={(e) =>
              //   setFilters({ ...filters, brand: e.target.value })
              // }
            >
              <option value="">Tất cả</option>
              {allBrand?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="category__filters__item">
            <div className="category__filters__item__title">Danh mục</div>
            <div className="category__filters__item__checkbox">
              {allCategory?.map((item, index) => {
                return (
                  <Checkbox
                    label={item.name}
                    key={index}
                    /**  onChange={(input) => checkboxHandler(input.checked, item)} */
                  ></Checkbox>
                );
              })}
            </div>
          </div>
          {/* <div className="category__filters__item">
            <div className="category__filters__item__title">Bộ lọc giá</div>
            <PriceSlider
              onChange={(value) => setFilters({ ...filters, price: value })}
            ></PriceSlider>
          </div> */}
        </div>
        <div className="category__toggle">
          <Button size="sm">lọc sản phẩm</Button>
          {/* onClick={toggleFilterHandler}  */}
        </div>
        <div className="category__products">
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {allProduct?.map((item, index) => {
              return <ProductCard product={item} key={index}></ProductCard>;
            })}
          </Grid>
        </div>
      </div>
    </Helmet>
  );
};
export default FindCategory;
