<?php
/**
 * Created by PhpStorm.
 * User: wilder15
 * Date: 12/12/17
 * Time: 12:30
 */

namespace AppBundle\Controller;
use AppBundle\Entity\Category;
use AppBundle\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;



/**
 * @Route("game", name="game")
 */
class GameController extends Controller
{
    /**
     * @Route("/user-{user_id}/category-{category_id}", name="game_start")
     * @ParamConverter("user", class="AppBundle:User", options={"id" = "user_id"})
     * @ParamConverter("category", class="AppBundle:Category", options={"id" = "category_id"})
     */
    public function launchGameAction(User $user, Category $category)
    {
        $em = $this->getDoctrine()->getManager();
        $words = $em->getRepository('AppBundle:Word')->findByCategory($category->getId());

        return $this->render('front/game.html.twig', ['words'=>$words, 'user'=>$user, 'category'=>$category]);

}
}