"use client";

import React, { useEffect, useState } from "react";//JSX sintakse, effect blakus efekts komponentes dzīves ciklā, state saglabāt datus var mainīties auto atjauno komponenti kad dati mainas
import { fetchBlogs } from "../../../utils/fetchBlogs";
import styles from '../../styles/blogPost.module.css';

// Interfeiss, kas definē bloga ieraksta rekvizītus
interface BlogPostProps {
  params: Promise<{ slug: string }>; // Atjaunina tipu, lai norādītu, ka params ir Promise
}

// React FC fukcionālais komponents(tipa definīcija, piem auto piev. children)
//params asinkroniskais objekts, izpildis atgriež blog
const BlogPost: React.FC<BlogPostProps> = ({ params }) => {
  const [blogPost, setBlogPost] = useState<any>(null); // Stāvoklis, lai saglabātu bloga ierakstu
  const [slug, setSlug] = useState<string | null>(null); // Stāvoklis, lai saglabātu slug

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params; // Atver params, izmantojot await
      setSlug(resolvedParams.slug); // Iestata slug
    };
    getSlug(); // Izsauc funkciju
  }, [params]);

  useEffect(() => {
    const getBlogPost = async () => {
      if (slug) { // Ja slug ir pieejams
        try {
          const blogPosts = await fetchBlogs(); // Iegūst visus bloga ierakstus
          const post = blogPosts.find((b: any) => b.slug === slug);// Filtrē blog pēc slug, katram blog masīvā, vai atbilst slug
          setBlogPost(post); // Saglabā atrasto ierakstu stāvoklī
        } catch (error) {
          console.error("Neizdevās iegūt bloga ierakstu:", error); // Izvada kļūdu konsolē
        }
      }
    };

    getBlogPost(); // Izsauc funkciju, lai iegūtu bloga ierakstu, ja slug ir pieejams
  }, [slug]);

  if (!blogPost) return <div className={styles.textCenter}>Blogu ierakstu neizdevās atrast.</div>; // Atgriež ziņu, ja bloga ieraksts netika atrasts

  // Attēla URL apstrāde
  const imageUrl = blogPost.coverImage
    ? blogPost.coverImage
        .replace('wix:image://', 'https://static.wixstatic.com/media/') // Nomaina URL daļu
        .replace('/v1/', '/')// Aizstāj daļu URL
        .split('#')[0]// Noņem fragmentu
        .split('/').slice(0, -1).join('/') // Apstrādā attēla URL
    : 'https://static.wixstatic.com/media/be6ced_bcff3b85ac9e4882b8afd3d852842f7f~mv2.png'; // Rezerves attēls

  return (
    <div className={`${styles.flex} ${styles.flexCol} ${styles.minHScreen}`}>
      <main className={`${styles.container} ${styles.main}`}>
        <h1 className={styles.text4xl}>{blogPost.slug}</h1> {/*Rāda bloga ieraksta nosaukumu*/}
        <div className={styles.card}>
          {imageUrl && (
            <img
              src={imageUrl} // Iestata attēla avotu
              alt={blogPost.slug} // Alt teksts attēlam
              className={`${styles.wFull} ${styles.h72} ${styles.objectContain} ${styles.mb4}`}
            />
          )}
          <p className={`${styles.textGray600} ${styles.mb4}`}>{blogPost.excerpt}</p> {/* Rāda bloga ieraksta īso aprakstu*/}
          <div className={styles.mt4}>
            <h2 className={styles.text2xl}>Saturs</h2>
            {blogPost.richContent?.nodes.map((node: any) => ( // ? - ja nodes/rich nav definēts tad atgriezīs null, nodes - masīvs kas jāapstrādā, satur visu .map() iterē cauri visiem nodes, veicot kādu darbību ar node. => izsaukta katram node, lai parāda
              <div key={node.id}>
                {node.type === "PARAGRAPH" && node.nodes[0]?.textData?.text && ( // Ja tips ir PARAGRAPH
                  <p className={`${styles.textGray700} ${styles.mb4}`}>{node.nodes[0].textData.text}</p> // Rāda tekstu
                )}
                {node.type === "HEADING" && node.nodes[0]?.textData?.text && ( // Ja tips ir HEADING
                  <h3 className={`${styles.text2xl} ${styles.fontBold} ${styles.mt4} ${styles.mb2}`}>
                    {node.nodes[0].textData.text} {/* Rāda virsrakstu*/}
                  </h3>
                )}
                {node.type === "BULLETED_LIST" && ( // Ja tips ir BULLETED_LIST
                  <ul className={`${styles.listDisc} ${styles.pl5} ${styles.mb4}`}>
                    {node.nodes.map((listItem: any) => ( // Iziet cauri katram listItems, kas nāk no node.nodes masīva, kas pieder pie node
                      <li key={listItem.id} className={`${styles.textGray700} ${styles.mb2}`}>
                        {listItem.nodes.map((paragraph: any) => ( // pārbauda katru nodes listitems masīvu 
                          paragraph.nodes[0]?.textData?.text && ( // ielien paragraph objektā, pieņem ka nodes ir pirmais elements. ja nav tad atgriež null nevis kļūdu
                            <p key={paragraph.id} className={`${styles.textGray700} ${styles.mb2}`}>
                              {paragraph.nodes[0].textData.text} {/* Rāda saraksta vienības tekstu*/}
                            </p>
                          )
                        ))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );    
};

export default BlogPost;
