import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { PanelBody, QueryControls, ToggleControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { RawHTML } from "@wordpress/element";
import icons from ".././icons.js";
import "./main.css";

registerBlockType("tbones-p/post-list", {
  icon: {
    src: icons.primary,
  },
  edit({ attributes, setAttributes }) {
    const { title, count, tags, hidetitle } = attributes;
    const blockProps = useBlockProps({
      className: "ta-sidebar-blog-widget",
    });

    // console.log(count, cuisines);

    const terms = useSelect((select) => {
      return select("core").getEntityRecords("taxonomy", "post_tag", {
        per_page: -1,
      });
    });
    const suggestions = {};

    // console.log(terms);

    terms?.forEach((term) => {
      suggestions[term.name] = term;
    });

    const tagIDs = tags.map((term) => term.id);

    // console.log(tagIDs);

    const posts = useSelect(
      (select) => {
        return select("core").getEntityRecords("postType", "post", {
          per_page: count,
          _embed: true,
          tags: tagIDs,
          order: "desc",
          orderByRating: 1,
        });
      },
      [count, tagIDs]
    );

    // console.log(posts);

    //  Using apiFetch

    // let postTags = [];
    // let loopPostId;

    // updatePostTags = useEffect(async () => {
    //   let response = await wp.apiFetch({
    //     path:
    //       "tbones/v1/tags/?" +
    //       new URLSearchParams({
    //         postid: loopPostId,
    //       }),
    //     method: "GET",
    //   });
    //   postTags.splice(loopPostId, 0, response);
    //   // console.log(postTags);
    // }, [loopPostId]);

    // posts?.map((post) => {
    //   // console.log(post.id);
    //   loopPostId = post.id;
    //   updatePostTags;
    // });

    // useEffect(async () => {
    //   const response = await wp.apiFetch({
    //     path: "/wp/v2/taxonomies/cuisine",
    //     method: "GET",
    //   });
    //   console.log(response);
    // }, []);

    // =============Independently working=============================

    // let { postTags, isLoading } = useSelect((select) => {
    //   let { getEntityRecords, isResolving } = select("core");

    //   let taxonomyArgs = [
    //     "taxonomy",
    //     "post_tag",
    //     {
    //       post: 429,
    //     },
    //   ];

    //   return {
    //     postTags: getEntityRecords(...taxonomyArgs),
    //     isLoading: isResolving("getEntityRecords", taxonomyArgs),
    //   };
    // }, []);

    // console.log(postTags, isLoading);

    // ====================LEON'S SOLUTION=========================================

    // let postsWithCusineArr = [];

    // const { getEntityRecords } = useSelect((select) => {
    //   let { getEntityRecords } = select("core");
    //   return getEntityRecords;
    // }, []);

    // console.log(getEntityRecords);

    // posts?.map((post) => {
    //   console.log(post.id);

    //   let taxonomyArgs = [
    //     "taxonomy",
    //     "post_tag",
    //     {
    //       post: post.id,
    //     },
    //   ];

    //   postsWithCusineArr = getEntityRecords(...taxonomyArgs);

    //   console.log(postsWithCusineArr);

    //=====================================================================

    // let [postTermIDs] = useEntityProp(
    //   "postType",
    //   "post",
    //   "post_tag",
    //   post.id
    // );

    // console.log(postTermIDs);

    // let { postCuisines, isLoading } = useSelect((select) => {
    //   console.log("A");
    //   let { getEntityRecords, isResolving } = select("core");
    //   console.log("B");
    //   let postTaxonomyArgs = [
    //     "taxonomy",
    //     "cuisine",
    //     {
    //       post: 407,
    //     },
    //   ];
    //   console.log("C");
    //   postCuisines = getEntityRecords(...postTaxonomyArgs);
    //   console.log("D");
    //   isLoading = isResolving("getEntityRecords", postTaxonomyArgs);
    //   console.log("E");
    //   return {
    //     postCuisines,
    //     isLoading,
    //   };
    // });
    // console.log(postCuisines, isLoading);
    // console.log(postTermIDs);
    // });

    //===========================================================

    // posts?.map((post) => {
    //   console.log(post);
    //   console.log("0");

    //   () => {
    //     console.log("1");
    //   };

    //   let {
    //     postCuisines,
    //     isLoading,
    //   } = () => {
    //     console.log("1");

    //     // let { getEntityRecords, isResolving } = select("core");
    //     // console.log("2");
    //     // let taxonomyArgs = [
    //     //   "taxonomy",
    //     //   "cuisine",
    //     //   {
    //     //     post: 407,
    //     //   },
    //     // ];
    //     // console.log("3");
    //     // postCuisines = getEntityRecords(...taxonomyArgs);
    //     // console.log("4");
    //     // isLoading = isResolving("getEntityRecords", taxonomyArgs);
    //     // console.log("5");
    //     // return {
    //     //   postCuisines,
    //     //   isLoading,
    //     // };
    //   };

    //   console.log(postCuisines, isLoading);

    //   //   postsWithCusineArr.splice(post.id, 0, postCuisines);
    // });

    //=========================================================

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Settings", "tbones-p")}>
            <ToggleControl
              label="Hide Title"
              help={hidetitle ? "Hiding Title" : "Showing Title"}
              checked={hidetitle}
              onChange={(state) => {
                setAttributes({ hidetitle: state });
              }}
            />
            <QueryControls
              numberOfItems={count}
              minItems={1}
              maxItems={10}
              onNumberOfItemsChange={(count) => setAttributes({ count })}
              categorySuggestions={suggestions}
              categoryLabel={"Tags"}
              onCategoryChange={(newTerms) => {
                const newTags = [];

                newTerms.forEach((tag) => {
                  if (typeof tag === "object") {
                    return newTags.push(tag);
                  }

                  const tagTerm = terms?.find((term) => term.name === tag);

                  if (tagTerm) newTags.push(tagTerm);
                });

                setAttributes({ tags: newTags });
              }}
              selectedCategories={tags}
            />
          </PanelBody>
        </InspectorControls>
        <ul {...blockProps}>
          {!hidetitle && (
            <RichText
              multiline={false}
              tagName="h3"
              value={title}
              onChange={(title) => setAttributes({ title: title })}
            />
          )}

          {posts?.map((post) => {
            // console.log(post);

            const featuredImage =
              post._embedded &&
              post._embedded["wp:featuredmedia"] &&
              post._embedded["wp:featuredmedia"].length > 0 &&
              post._embedded["wp:featuredmedia"][0];

            //Formatting the date

            let postCreationDate = post.date.substr(0, 10);

            var dateVar = new Date(postCreationDate);

            var month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            var day = dateVar.getDate();

            postCreationDate =
              month[dateVar.getMonth()] +
              " " +
              day +
              ", " +
              dateVar.getFullYear();

            // console.log(post.cuisine);

            // Get post tags

            // let postCuisiness;

            // postCuisiness = useSelect((select) => {
            //   let { getEntityRecords, isResolving } = select("core");

            //   let taxonomyArgs = [
            //     "taxonomy",
            //     "cuisine",
            //     {
            //       post: 367,
            //     },
            //   ];

            //   return getEntityRecords(...taxonomyArgs);
            // });

            // console.log(postCuisiness);
            let ourFilteredTags = [];

            let ourTags = terms ? [...terms] : [];

            if (ourTags) {
              ourFilteredTags = ourTags.filter(
                (t) => post.tags.indexOf(t.id) > -1
              );
            }

            return (
              <>
                <li className="ta-sidebar-blog-widget__blog-item">
                  <ul className="ta-category-listing">
                    {ourFilteredTags &&
                      ourFilteredTags.map((item, index) => {
                        return (
                          <li>
                            <a href="#" className="ta-tags">
                              {item.name}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="ta-post-title">
                    <a href={post.link}>
                      <RawHTML>{post.title.rendered}</RawHTML>
                    </a>
                  </div>
                  <div className="ta-author-data">
                    <div className="ta-name-initials">
                      <a href="#">
                        {post._embedded.author[0].name.slice(0, 2)}
                      </a>
                    </div>
                    <div className="basis-[100%]">
                      <div className="font-bold ta-author">
                        <a href="#">{post._embedded.author[0].name}</a>
                      </div>
                      <p className="ta-post-date">{postCreationDate}</p>
                    </div>
                    <img
                      src="/wp-content/uploads/2022/12/bookmark_icon_black.svg"
                      className="w-4 h-4 basis-1/5"
                      alt=""
                    />
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </>
    );
  },
});
